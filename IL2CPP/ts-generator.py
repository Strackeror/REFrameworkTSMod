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
from typing import IO, Dict, List, Pattern, Set, Tuple
from unicodedata import name


@dataclass
class Field:
    type: Class
    name: str = ""
    default: str = ""
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
    name: str = ""
    namespaces: List[str] = field(default_factory=list)
    methods: List[Method] = field(default_factory=list)
    fields: List[Field] = field(default_factory=list)

    generic_count: int = 0

    generic_parent: Class | None = None
    generic_params: List[Class] = field(default_factory=list)

    def __repr__(self):
        return f"{self.name}"

    def typescript_type(self):
        if self.generic_parent:
            template = f'<{",".join([c.typescript_type() for c in self.generic_params])}>'
            ret = self.generic_parent.typescript_type() + template
        else:
            ret = ".".join(self.namespaces)
        return ret

    def local_name(self):
        return self.namespaces[-1]
    

    def is_enum(self):
        if not self.parent:
            return
        return self.parent.name == "System.Enum"


os.chdir(os.path.dirname(__file__))

filters: List[Pattern] = [re.compile(s) for s in (json.load(open("type-filters.json")))]
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
    "Any": "any",
    "unknown": "unknown",
}

for k, t in converted_types.items():
    parsed_types[k] = Class(name=k, namespaces=[t])

@dataclass
class NamespaceTree():
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

def nameInFilter(str: str) -> bool:
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
    for name, entry in cls_entry["methods"].items():
        if entry["function"] == "0" and "ContainsGenericParameters" not in (entry.get("impl_flags") or ""):
            continue
        new_method = parseMethod(name, entry, methods)
        methods.add(new_method.name)
        cls.methods.append(new_method)
    
def parseFields(cls: Class, cls_entry: Dict):
    if "fields" in cls_entry:
        for _name, _field in cls_entry["fields"].items():
            default = _field.get("default") or ""
            static = "Static" in (_field.get("flags") or "")
            cls.fields.append(
                Field(parseClass(_field["type"]), _name, default, static))

def makeNamespace(cls: Class, name_hierarchy: List[str]):
    i = 0
    for n in name_hierarchy:
        for s in n.split('.'):
            s = make_valid_symbol(s)
            if i > 0 and s in namespace_tree.nodes:
                s = s + "__"
            i += 1
            cls.namespaces.append(s)

    tree_cursor = namespace_tree
    for k in cls.namespaces:
        tree_cursor = tree_cursor.nodes[k]
    if tree_cursor.cls:
        print("Error: duplicate namespace position ", cls.name, " and ", tree_cursor.cls.name)
    else:
        tree_cursor.cls = cls
        


def parseEnum(cls: Class, entry):
    makeNamespace(cls, entry["name_hierarchy"] or [])

    cls.parent = parseClass("System.Enum", True)
    parseFields(cls, entry)
    return cls


def tryParseTemplateParam(name: str, entry: Dict):
    if groups := re.fullmatch(r"!(\d+)", name):
        new_class = Class(name=name, namespaces=[f"G{groups[1]}"])
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
    name_hierarchy = entry.get('name_hierarchy') or []
    name = cls.name
    if name_hierarchy == [""]:
        if groups := re.fullmatch(r'(.+)(\[\])', name):
            if not name.startswith("!"):
                if groups[1] in dump:
                    return parseGenericSpecialization(cls, "!0[]", [groups[1]])
                else:
                    return parseGenericSpecialization(cls, "!0[]", ["unknown"])
        else:
            return parseClassContent(cls, entry, ["System", "Array", "Other"])

    if name == "!0[]":
        cls.generic_count = 1
        return parseClassContent(cls, entry, ["System", "Array", "Generic"])
    return None


def parseGenericSpecialization(cls: Class, generic_parent_name: str, generic_params: List[str]):
    cls.generic_parent = parseClass(generic_parent_name, True)
    if not cls.generic_parent.generic_count:
        parsed_types[cls.name] = cls.generic_parent
        return cls.generic_parent

    cls.generic_params = [parseClass(n) for n in generic_params]
    cls.namespaces = cls.generic_parent.namespaces
    return cls


def tryParseGeneric(cls: Class, entry: Dict):
    name_hierarchy = entry.get('name_hierarchy') or []
    if "generic_arg_types" in entry:
        base_name = '.'.join(name_hierarchy)
        generic_types: List[str] = [g["type"]
                                    for g in entry["generic_arg_types"]]
        if any(t != "unknown" for t in generic_types):
            parent_name = f'{base_name}<{","* (len(generic_types)-1)}>'
            if parent_name in dump:
                return parseGenericSpecialization(cls, parent_name, generic_types)
            else:
                parsed_types[cls.name] = parsed_types["Any"]
                return parsed_types["Any"]
        cls.generic_count = len(generic_types)
        return parseClassContent(cls, entry, name_hierarchy)
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
    if cls := tryParseTemplateParam(name, entry):
        parsed_types[name] = cls
        return cls

    if not force:
        if cls := tryPassFilter(name, entry):
            return cls

    new_class = Class()
    new_class.name = name
    parsed_types[name] = new_class

    if cls := tryParseEnum(new_class, entry):
        return cls

    if cls := tryParseArray(new_class, entry):
        return cls

    if cls := tryParseGeneric(new_class, entry):
        return cls

    return parseClassContent(new_class, entry) or parsed_types["Any"]

def passClass(cls: Class):
    '''second pass for fixes'''
    if cls.parent:
        parent = cls.parent
        for g in cls.parent.generic_params:
            if g == cls:
                cls.parent = parent.parent


def quote(pstr: str)-> str:
    if valid_symbol(pstr):
        return pstr
    return '"' + pstr + '"'


def write_field(file: IO, field: Field, in_class: bool):
    if in_class:
        file.write(f'  {quote(field.name)}: {field.type.typescript_type()},\n')
    else:
        file.write(f'  let {make_valid_symbol(field.name)}: {field.type.typescript_type()}\n')

def write_method(file: IO, method: Method, in_class: bool):
    name = method.name
    if in_class:
        file.write(f" {quote(name)}")
    else:
        file.write(f"  function {make_valid_symbol(name)} ")
  
    # typescript-to-lua adds an implicit self by default
    file.write("(")
    if method.static:
        file.write("this: {}, ")
    for p in method.params:
        file.write(f"{p.name}: {p.type.typescript_type()}, ")
    file.write(f"): {method.ret.typescript_type()};\n")

def filter_members(cls: Class, in_class: bool) -> Tuple[List[Method], List[Field]]:
    go_in_class = lambda t: not t.static or not valid_symbol(t.name)
    if cls.generic_count:
        if in_class:
            return (cls.methods, cls.fields)
        else:
            return ([], [])
    return ([m for m in cls.methods if go_in_class(m) == in_class], [f for f in cls.fields if go_in_class(f) == in_class])
    

def write_class(file: IO, class_def: Class):
    template = ""
    template_full = ""
    if class_def.generic_count:
        template = "<" + \
            ",".join(f"G{i}" for i in range(class_def.generic_count)) + ">"
        template_full = "<" + \
            ",".join(f"G{i} = any" for i in range(
                class_def.generic_count)) + ">"

    file.write(f"interface __{class_def.local_name()}{template}")
    file.write("{\n")

    (methods, fields) = filter_members(class_def, True)
    for f in fields:
        write_field(file, f, True)

    for method in methods:
        write_method(file, method, True)

    # indexing function
    if (any(m.name == "get_Item" for m in class_def.methods) and
            any(m.name == "set_Item" for m in class_def.methods)):
        get = next(m for m in class_def.methods if m.name == "get_Item")
        if len(get.params) == 1:
            input = get.params[0]
            output = get.ret
            if input.type.name in converted_types:
                file.write(f'  [idx: {input.type.typescript_type()}]')
                file.write(f': {output.typescript_type()},\n')

    file.write("}\n")


    
    lname = class_def.local_name()
    parent = "void"
    if class_def.parent:
        parent = class_def.parent.typescript_type()
    if class_def.generic_count:
        file.write(
            f"type {lname}{template_full} = Inherit<__{lname}{template}, {parent}>\n")
    else:
        file.write(
            f"interface {lname} extends Inherit<__{lname}, {parent}> {{}}\n")

def write_class_namespace(file: IO, cls: Class):
    # static stuff in a namespace

    (methods, fields) = filter_members(cls, False)
    for f in fields:
        write_field(file, f, False)

    for method in methods:
        write_method(file, method, False)

    file.write(f"  let M: Members<{cls.local_name()}>\n")



def write_enum(file: IO, class_def: Class):
    file.write(f"enum {class_def.local_name()} {{\n")
    for f in class_def.fields:
        if not isinstance(f.default, int):
            file.write(f'  {f.name} = "{f.default}",\n')
        else:
            file.write(f"  {f.name} = {f.default},\n")
    file.write("}\n")


written_count = 0


def write_tree(file: IO, name: str, tree_cursor: NamespaceTree, prev_name=""):

    if tree_cursor.cls:
        if name and not prev_name:
            file.write("export declare ")
        
        if tree_cursor.cls.is_enum():
            write_enum(file, tree_cursor.cls)
        else:
            write_class(file, tree_cursor.cls)

    if name:
        if not prev_name:
            file.write(f"export declare ")
        file.write(f"namespace {name} {{\n")
        
    if tree_cursor.cls and not tree_cursor.cls.is_enum():
        write_class_namespace(file, tree_cursor.cls)

    for node in sorted(tree_cursor.nodes):
        write_tree(file, node, tree_cursor.nodes[node], name)

    if name:
        file.write("}\n")


def write_type_map(file: IO):
    top_types: Set[str] = set()
    type_map_text = ""
    for name, cls in parsed_types.items():
        if nameInFilter(name):
            if cls.namespaces and cls.namespaces[0] in namespace_tree.nodes:
                top_types.add(cls.namespaces[0])
            type_map_text += (f' "{name}": {cls.typescript_type()},\n')    
            
    for i in range(10):
        file.write(f"export type G{i} = any;\n")
    file.write("import {\n  ")
    file.write(',\n  '.join(top_types))
    file.write('\n} from "./il2cpp"\n')

    file.write("declare type TypeMap = {\n")
    file.write(type_map_text)
    file.write("}\n")




count = 0
for typename in dump:
    if nameInFilter(typename):
        count += 1
        parseClass(typename)

print("parsing done")
print(f"parse started for {count} types")
print(f"parsed a total of {len(parsed_types)} types")

for type in parsed_types:
    passClass(parsed_types[type])

print("second pass done")

file = open("il2cpp.d.ts", 'w', encoding='utf-8')
for i in range(10):
    file.write(f"export type G{i} = any;\n")
write_tree(file, "", namespace_tree)
print("namespace tree written")

file = open("typemap.d.ts", 'w', encoding='utf-8')
write_type_map(file)
print("type map written")
