from __future__ import annotations
from faulthandler import is_enabled

import re
import pdb
import json
import os
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pprint import pprint
from string import ascii_letters, digits
from types import new_class
from typing import IO, Dict, List, Pattern, Set, Tuple, TypedDict
from unicodedata import name
from xmlrpc.client import Boolean

GENERAL_INDEXING = False

@dataclass
class Field:
    type: Class
    name: str = ""
    default: str | int | None = None
    static: bool = False


@dataclass()
class Method:
    ret: Class
    name: str = ""
    full_name: str = ""
    full_name_ret: str = ""
    index: int = 0
    static: bool = False
    params: List[Field] = field(default_factory=list)


@dataclass
class Class:
    parent: Class | None = None
    underlying_type: str = ""
    name: str = ""
    index: int = 0
    namespaces: List[str] = field(default_factory=list)
    methods: List[Method] = field(default_factory=list)
    fields: List[Field] = field(default_factory=list)

    generic_count: int = 0

    generic_parent: Class | None = None
    generic_params: List[Class] = field(default_factory=list)

    def __repr__(self):
        return f"{self.name}"

    def typescript_type(self, as_param = False):
        if self.underlying_type:
            return self.underlying_type
        if self.generic_parent:
            template = ""
            if not self.generic_parent.is_enum() and not as_param:
                template = f'<{",".join([c.typescript_type() for c in self.generic_params])}>'
            ret = self.generic_parent.typescript_type(as_param) + template
        else:
            ret = ".".join(self.namespaces)
            if as_param:
                ret += ".P"
        return ret

    def template(self, defaults: bool) -> str:
        if not self.generic_count:
            return ""
        if self.is_enum():
            return ""
        if defaults:
            return "<" + ",".join(f"G{i} = any" for i in range(
                    self.generic_count)) + ">"
        return "<" + ",".join(f"G{i}" for i in range(self.generic_count)) + ">"


    def local_name(self):
        if self.underlying_type:
            return self.underlying_type
        return self.namespaces[-1]
    

    def is_enum(self):
        if not self.parent:
            return
        return self.parent.name == "System.Enum"


os.chdir(os.path.dirname(__file__))


FilterType = TypedDict(
    '', {'namespace_tree_filter': List[str], 'type_map_filter': List[str]})

type_filters: FilterType = json.load(open("type-filters.json"))
namespace_tree_filters = [
    re.compile(s) for s in (type_filters["namespace_tree_filter"])]
type_map_filters = [
    re.compile(s) for s in type_filters["type_map_filter"]]

dump: Dict[str, Dict] = json.load(open("il2cpp_dump.json", encoding="utf-8"))

print("json loaded")

parsed_types: Dict[str, Class]= {}

converted_types = {
    "System.Single": "number",
    "System.Double": "number",
    "System.Void": "number",
    "System.UInt8": "number",
    "System.UInt16": "number",
    "System.UInt32": "number",
    "System.UInt64": "number",
    "System.Int8": "number",
    "System.Int16": "number",
    "System.Int32": "number",
    "System.Int64": "number",
    "System.SByte": "number",
    "System.Byte": "number",
    "System.UByte": "number",
    "System.UIntPtr": "number",
    "System.IntPtr": "number",
    "System.Char": "number",
    "System.UChar": "number",
    "System.Void*": "number",
    "System.TypeCode": "number",
    "System.DateTime": "number",
    "System.TimeSpan": "number",
    "System.Boolean": "boolean",
    "System.String": "string",
    "System.Void": "void",
}

parsed_types = {
    "Any": Class(name="Any", underlying_type="any"),
    "unknown": Class(name="unknown", underlying_type="unknown")
}

@dataclass
class NamespaceTree():
    name: str = ""
    nodes: Dict[str, NamespaceTree] = field(default_factory=lambda: defaultdict(NamespaceTree))
    cls: Class | None = None

namespace_tree = NamespaceTree()

typescript_keyword = ["break", "case", "catch",
                      "class", "const", "continue",
                      "debugger", "default", "delete",
                      "do", "else", "enum",
                      "export", "extends", "false",
                      "finally", "for", "function",
                      "if", "import", "in",
                      "istanceOf", "new", "null",
                      "return", "super", "switch",
                      "this", "throw", "true",
                      "try", "typeOf", "var",
                      "void", "while", "with"]

def nameInFilter(str: str, filters: List[Pattern[str]]) -> bool:
    if not filters:
        return True
    if any(re.match(f, str) for f in filters): 
        return True
    if str in converted_types:
        return True
    return False

def valid_symbol(str: str):
    if not str:
        return False
    if str[0] in digits:
        return False
    if set(str).difference(ascii_letters + digits + "_"):
        return False

    if str in typescript_keyword:
        return False
    return True


def make_valid_symbol(pstr: str):
    if not pstr:
        pstr = "__"

    if pstr[0] in digits:
        pstr = "_" + pstr

    for c in set(pstr):
        if c not in ascii_letters + digits + "_":
            if c == '!':
                pstr = pstr.replace(c, '_e_')
            else:
                pstr = pstr.replace(c, '__')

    if pstr in typescript_keyword:
        pstr += "_"
    return pstr


def parseMethod(method_name: str, method_entry: Dict, found: Set[str]):
    new_method = Method(parseClass(method_entry["returns"]["type"]))
    new_method.index = method_entry["id"]
    new_method.static = "Static" in method_entry["flags"]

    name = method_name.strip("0123456789")
    param_entries = method_entry.get("params") or []

    if name in found:
        name = name + '(' + ','.join(e.get("type") for e in param_entries) + ')'
    if name in found:
        name = name + "->" + method_entry["returns"]["type"]
    if name in found:
        name = name + str(new_method.index)

    new_method.name = name
    i = 0
    for param in param_entries:
        name = param["name"]
        if not valid_symbol(name):
            name = f"param{i}"
        i += 1
        new_method.params.append(
            Field(type=parseClass(param["type"]), name=name))
    return new_method

def parseMethods(cls: Class, cls_entry: Dict):
    methods = set()
    if "methods" not in cls_entry:
        return
    sorted_items = sorted(cls_entry["methods"].items(), key=lambda pair: pair[1]["id"])
    for name, entry in sorted_items:
        if entry["function"] == "0" and "ContainsGenericParameters" not in (entry.get("impl_flags") or ""):
            continue
        new_method = parseMethod(name, entry, methods)
        methods.add(new_method.name)
        cls.methods.append(new_method)
    
def parseFields(cls: Class, cls_entry: Dict):
    if "fields" in cls_entry:
        for _name, _field in cls_entry["fields"].items():
            default = _field.get("default")
            static = "Static" in (_field.get("flags") or "")
            cls.fields.append(
                Field(parseClass(_field["type"]), _name, default, static))

def makeNamespace(cls: Class, name_hierarchy: List[str]):
    i = 0
    for n in name_hierarchy:
        n = n.replace('`', '.T')
        for s in n.split('.'):
            s = make_valid_symbol(s)
            if i > 0 and s in namespace_tree.nodes:
                s = s + "__"
            i += 1
            cls.namespaces.append(s)

    tree_cursor = namespace_tree
    for k in cls.namespaces:
        tree_cursor = tree_cursor.nodes[k]
        tree_cursor.name = k
    if tree_cursor.cls:
        print("Error: duplicate namespace position ", cls.name,
              " and ", tree_cursor.cls.name, "at", cls.namespaces)
    else:
        tree_cursor.cls = cls
        


def parseEnum(cls: Class, entry):
    makeNamespace(cls, entry["name_hierarchy"] or [])

    cls.parent = parseClass("System.Enum", True)
    cls.underlying_type = "number"
    parseFields(cls, entry)
    return cls


def tryParseTemplateParam(name: str, entry: Dict):
    if groups := re.fullmatch(r"!(\d+)", name):
        new_class = Class(name=name, underlying_type=f"G{groups[1]}")
        return new_class
    if re.fullmatch(r"!!+\d+", name):
        return parsed_types["Any"]
    return None


def tryPassFilter(name: str, entry: Dict):
    # if name in ["System.Object", "System.Enum", "System.ValueType", "!0[]"]:
    #     return None
    # if name.endswith("[]"):
    #     return None
    # if filter and (not name.startswith(filter)):
    #     if "parent" in entry:
    #         return parseClass(entry["parent"])
    #     return parsed_types["Any"]
    return None


def tryParseArray(cls: Class, entry: Dict):
    if entry.get("parent") != "System.Array":
        return None

    name = cls.name
    if name == "!0[]":
        cls.generic_count = 1
        return parseClassContent(cls, entry, ["System", "Array", "Generic"])
    
    get_func = [entry["methods"][m] for m in entry["methods"] if re.fullmatch(r'Get\d+', m)][0]
    contained_type: str = get_func["returns"]["type"]
    index_count = len(get_func["params"])
    if index_count == 1:
        return parseGenericSpecialization(cls, "!0[]", [contained_type])

    return parseClassContent(cls, entry, contained_type.split('.') + [f"Array{index_count}"])


def parseGenericSpecialization(cls: Class, generic_parent_name: str, generic_params: List[str]):
    cls.generic_parent = parseClass(generic_parent_name, True)
    if not cls.generic_parent.generic_count:
        parsed_types[cls.name] = cls.generic_parent
        return cls.generic_parent

    cls.generic_params = [parseClass(n) for n in generic_params]
    cls.namespaces = cls.generic_parent.namespaces
    cls.underlying_type = cls.generic_parent.underlying_type
    return cls


def tryParseGeneric(cls: Class, entry: Dict):
    name_hierarchy = entry.get('name_hierarchy') or []
    if entry.get("is_generic_type"):
        generic_types: List[str] = [g["type"]
                                    for g in entry["generic_arg_types"]]
        if entry["is_generic_type_definition"]:
            cls.generic_count = len(generic_types)
            return None
        else:
            parent_name = entry["generic_type_definition"]
            return parseGenericSpecialization(cls, parent_name, generic_types)
    return None


def tryParseEnum(cls: Class, entry: Dict):
    if entry.get("parent") == "System.Enum":
        return parseEnum(cls, entry)
    return None



def parseClassContent(cls: Class, entry: Dict, name_hierarchy: List[str] | None = None):
    name_hierarchy = name_hierarchy or entry.get("name_hierarchy")
    name_hierarchy = name_hierarchy or []
    makeNamespace(cls, name_hierarchy)

    if "parent" in entry:
        cls.parent = parseClass(entry["parent"], force=True)

    parseFields(cls, entry)
    parseMethods(cls, entry)

    return cls


def parseClass(name: str, force: bool = False) -> Class:
    global parsed_types
    global namespace_tree

    if name in parsed_types:
        return parsed_types[name]

    if name not in dump:
        print("Error finding type", name)
        return parsed_types["Any"]


    entry = dump[name]
    if "id" not in entry:
        return parsed_types["Any"]

    if cls := tryParseTemplateParam(name, entry):
        parsed_types[name] = cls
        return cls

    if not force:
        if cls := tryPassFilter(name, entry):
            return cls

    new_class = Class()
    new_class.name = name
    new_class.index = entry["id"]
    if name in converted_types:
        new_class.underlying_type = converted_types[name]

    parsed_types[name] = new_class

    if cls := tryParseGeneric(new_class, entry):
        return cls

    if cls := tryParseEnum(new_class, entry):
        return cls

    if cls := tryParseArray(new_class, entry):
        return cls


    return parseClassContent(new_class, entry) or parsed_types["Any"]

def passClass(cls: Class):
    '''second pass for fixes'''
    if cls.parent:
        parent = cls.parent
        for g in cls.parent.generic_params:
            if g == cls:
                cls.parent = parent.parent
                cls.fields.append(Field(cls, "Instance", static = True))
                break


def quote(pstr: str)-> str:
    if valid_symbol(pstr):
        return pstr
    return '"' + pstr + '"'


def write_field(file: IO, field: Field):
    if field.type.underlying_type:
        file.write(f'    {quote(field.name)}: {field.type.typescript_type()};\n')
    else:
        file.write(f'    get {quote(field.name)}(): {field.type.typescript_type()}; '
            f'set {quote(field.name)}(p: {field.type.typescript_type(True)});\n')

def write_method(file: IO, method: Method):
    name = method.name
    file.write(f"    {quote(name)}")
  
    # typescript-to-lua adds an implicit self by default
    file.write("(")
    for p in method.params:
        file.write(f"{p.name}: {p.type.typescript_type(True)}, ")
    file.write(f"): {method.ret.typescript_type()};\n")

def filter_members(cls: Class, static: bool) -> Tuple[List[Method], List[Field]]:
    is_static = lambda t: t.static == static
    return ([m for m in cls.methods if is_static(m)], [f for f in cls.fields if is_static(f)])
    

def write_class(file: IO, class_def: Class):

    template = class_def.template(False)
    template_full = class_def.template(True)

    parent_id_list = [class_def.index]
    cur_parent = class_def.parent
    while cur_parent:
        parent_id_list.insert(0, cur_parent.index)
        cur_parent = cur_parent.parent

    # Members section
    file.write(f"  interface __Members{template} extends P{{\n")
    (methods, fields) = filter_members(class_def, static=False)
    for f in fields:
        write_field(file, f)
    for method in methods:
        write_method(file, method)
        
    # indexing function
    if GENERAL_INDEXING:
        if (any(m.name == "get_Item" for m in class_def.methods) and
                any(m.name == "set_Item" for m in class_def.methods)):
            get = next(m for m in class_def.methods if m.name == "get_Item")
            if len(get.params) == 1:
                input = get.params[0]
                output = get.ret
                file.write(
                    f' &  Indexed<{input.type.typescript_type()},{output.typescript_type()}>\n')
    file.write("  }\n")
    
    # static section
    file.write(f"  type __Static{template_full} = Members<__Members{template}, T{template}> & {{\n")
    (methods, fields) = filter_members(class_def, static=True)
    for f in fields:
        write_field(file, f)
    for method in methods:
        write_method(file, method)
    file.write("  }\n")
    file.write("\n")
    

    # Intermediate type sections
    parent = "void"
    if class_def.parent:
        parent = class_def.parent.typescript_type()
    if class_def.generic_count:
        file.write(
            f"  type T{template_full} = Inherit<__Members{template}, {parent}>\n")
    else:
        file.write(
            f"  interface T extends Inherit<__Members, {parent}> {{}}\n")


    file.write(f"  type P = TypeId<{class_def.typescript_type()},[{','.join(str(id) for id in parent_id_list)}]>;\n")
    



def write_enum(file: IO, class_def: Class):
    file.write(f"interface __Static {{\n")
    for f in class_def.fields:
        if f.default != None:
            if isinstance(f.default, int):
                file.write(f"  {f.name}: {f.default},\n")
            else:
                file.write(f'  {f.name}: "{f.default}",\n')
    file.write("}\n")
    file.write(f"type T = __Static[keyof __Static]; ")
    file.write(f"type P = {class_def.underlying_type}\n")


written_count = 0


def write_tree(file: IO, tree_cursor: NamespaceTree, parent_cursor: NamespaceTree | None):
    name = tree_cursor.name

    if parent_cursor and tree_cursor.cls:
        file.write(f"\n// {tree_cursor.cls.name}\n")
        if not parent_cursor.name:
            file.write(f"export declare ")
        
        if tree_cursor.cls.is_enum():
            file.write(f"type {name} = {name}.T\n")
        else:
            file.write(
                f"interface {name}{tree_cursor.cls.template(True)} extends {name}.T{tree_cursor.cls.template(False)} {{}}\n")
    


    if name:
        if parent_cursor and not parent_cursor.name:
            file.write(f"export declare ")
        file.write(f"namespace {name} {{\n")
        

        
    if tree_cursor.cls:
        if tree_cursor.cls.is_enum():
            write_enum(file, tree_cursor.cls)
        else:
            write_class(file, tree_cursor.cls)

    for node in sorted(tree_cursor.nodes):
        write_tree(file, tree_cursor.nodes[node], tree_cursor)

    if name:
        file.write("}\n")


def write_ns_tree(file: IO, tree: NamespaceTree, export: bool):
    name = tree.name
    if tree.name:
        if export:
            file.write(f"export declare let ")
        file.write(f"{name}: ")
        if tree.cls:
            file.write(f"{'.'.join(tree.cls.namespaces)}.__Static & ")
        file.write("{")

    for node in tree.nodes:
        write_ns_tree(file, tree.nodes[node], tree.name == "")

    if tree.name:
        file.write("};\n")

def write_type_map(file: IO):
    top_types: Set[str] = set()
    type_map_text = ""
    for name, cls in parsed_types.items():
        if nameInFilter(name, type_map_filters):
            if cls.namespaces and cls.namespaces[0] in namespace_tree.nodes:
                top_types.add(cls.namespaces[0])
            type_map_text += (f' "{name}": {cls.typescript_type()},\n')
            
    for i in range(10):
        file.write(f"export type G{i} = any;\n")
    file.write("import {\n  ")
    file.write(',\n  '.join(top_types))
    file.write('\n} from "./IL2CPP"\n')

    file.write("declare type TypeMap = {\n")
    file.write(type_map_text)
    file.write("}\n")




count = 0
for typename in dump:
    if nameInFilter(typename, namespace_tree_filters):
        count += 1
        parseClass(typename)

print("parsing done")
print(f"parse started for {count} types")
print(f"parsed a total of {len(parsed_types)} types")

for type in parsed_types:
    passClass(parsed_types[type])

print("second pass done")

file = open("IL2CPP.d.ts", 'w', encoding='utf-8')
for i in range(10):
    file.write(f"export type G{i} = any;\n")
write_tree(file, namespace_tree, None)
print("class tree written")

write_ns_tree(file, namespace_tree, False)

file = open("typemap.d.ts", 'w', encoding='utf-8')
write_type_map(file)
print("type map written")
