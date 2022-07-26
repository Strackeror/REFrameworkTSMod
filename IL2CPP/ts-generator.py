from __future__ import annotations

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
from typing import IO, Dict, List, Pattern, TypedDict
from unicodedata import name


@dataclass
class Field:
    type: Class
    name: str = ""
    default: str = ""


@dataclass()
class Method:
    ret: Class
    name: str = ""
    full_name: str = ""
    full_name_ret: str = ""
    index: int = 0
    params: List[Field] = field(default_factory=list)


@dataclass
class Class:
    parent: Class | None = None
    name: str = ""
    local_name: str = ""
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
            ret = ".".join(self.namespaces + [self.local_name])
        return ret

os.chdir(os.path.dirname(__file__))

filters: List[Pattern] = [re.compile(s) for s in (json.load(open("type-filters.json")))]
dump: Dict[str, Dict] = json.load(open("il2cpp_dump.json", encoding="utf-8"))

print("json loaded")

parsed_types = {}

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
    parsed_types[k] = Class(name=k, local_name=t)


class NamespaceTree(TypedDict):
    nodes: Dict[str, NamespaceTree]
    classes: List[Class]


def namespace_tree_init() -> NamespaceTree:
    return {
        "nodes": defaultdict(namespace_tree_init),
        "classes": []
    }


namespace_tree = namespace_tree_init()


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


def parseMethod(class_def: Class, method_name: str, method_entry: Dict):
    new_method = Method(parseClass(method_entry["returns"]["type"]))
    new_method.name = method_name.strip("0123456789.")
    new_method.full_name = new_method.name + "("
    new_method.index = method_entry["id"]
    if "params" in method_entry:
        i = 0
        for param in method_entry["params"]:

            if i > 0:
                new_method.full_name += ','
            new_method.full_name += param["type"]

            name = param["name"]
            if not valid_symbol(name):
                name = f"param{i}"

            i += 1
            new_method.params.append(
                Field(type=parseClass(param["type"]), name=name))
    new_method.full_name += ")"
    new_method.full_name_ret = new_method.full_name + \
        f'-> {method_entry["returns"]["type"]}'

    return new_method


def makeNamespace(cls: Class, name_hierarchy: List[str]):
    i = 0
    for n in name_hierarchy:
        for s in n.split('.'):
            s = make_valid_symbol(s)
            if i > 0 and s in namespace_tree["nodes"]:
                s += "_"
            i += 1
            cls.namespaces.append(s)

    tree_cursor = namespace_tree
    for k in cls.namespaces:
        tree_cursor = tree_cursor["nodes"][k]
    tree_cursor["classes"].append(cls)

    if len(tree_cursor["classes"]) == 1:
        cls.local_name = "T"
    else:
        cls.local_name = f"T{len(tree_cursor['classes'])}"


def parseEnum(cls: Class, entry):
    makeNamespace(cls, entry["name_hierarchy"] or [])

    cls.parent = parseClass("System.Enum", True)

    if "fields" in entry:
        for _name, _field in entry["fields"].items():
            default = ""
            if "default" in _field:
                default = _field["default"]
            cls.fields.append(
                Field(name=_name, type=parseClass(_field["type"]), default=default))

    return cls


def tryParseTemplateParam(name: str, entry: Dict):
    if groups := re.fullmatch(r"!(\d+)", name):
        new_class = Class(name=name, local_name=f"G{groups[1]}")
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
    cls.local_name = cls.generic_parent.local_name
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

    if "methods" in entry:
        for _name, _method in entry["methods"].items():
            if _method["function"] == "0" and "ContainsGenericParameters" not in (_method.get("impl_flags") or ""):
                continue
            new_method = parseMethod(cls, _name, _method)
            cls.methods.append(new_method)
    if "fields" in entry:
        for _name, _field in entry["fields"].items():
            if not _name:
                continue
            default = ""
            if "default" in _field:
                default = _field["default"]
            cls.fields.append(
                Field(name=_name, type=parseClass(_field["type"]), default=default))
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


def write_method(file: IO, class_def: Class, method: Method, name: str):
    if not valid_symbol(name):
        file.write(f'  "{name}"')
    else:
        file.write("  " + name)

    # typescript-to-lua adds an implicit self by default

    file.write("(")
    i = 0
    for p in method.params:
        if i > 0:
            file.write(",")
        i += 1
        file.write(f"{p.name}: {p.type.typescript_type()}")
    file.write(f"): {method.ret.typescript_type()};\n")


def write_class(file: IO, class_def: Class):

    template = ""
    template_full = ""
    if class_def.generic_count:
        template = "<" + \
            ",".join(f"G{i}" for i in range(class_def.generic_count)) + ">"
        template_full = "<" + \
            ",".join(f"G{i} = any" for i in range(
                class_def.generic_count)) + ">"

    file.write(f"interface __{class_def.local_name}{template}")
    file.write("{\n")

    for f in class_def.fields:
        if valid_symbol(f.name):
            file.write(f'  {f.name}: {f.type.typescript_type()},\n')
        else:
            file.write(f'  "{f.name}": {f.type.typescript_type()},\n')

    method_name_map: Dict[str, List[Method]] = defaultdict(list)
    method_full_map: Dict[str, List[Method]] = defaultdict(list)
    method_full_ret_map: Dict[str, List[Method]] = defaultdict(list)

    for method in class_def.methods:
        method_name_map[method.name].append(method)
        method_full_map[method.full_name].append(method)
        method_full_ret_map[method.full_name_ret].append(method)

    for method in class_def.methods:
        if len(method_name_map[method.name]) == 1:
            write_method(file, class_def, method, method.name)
        elif len(method_full_map[method.full_name]) == 1:
            write_method(file, class_def, method, method.full_name)
        elif len(method_full_ret_map[method.full_name_ret]) == 1:
            write_method(file, class_def, method, method.full_name_ret)
        else:
            write_method(file, class_def, method, method.full_name_ret +
                         str(method_full_ret_map[method.full_name_ret].index(method)))

    # indexing function
    if len(method_name_map["set_Item"]) == 1 and len(method_name_map["get_Item"]) == 1:
        get = method_name_map["get_Item"][0]
        if len(get.params) == 1:
            input = get.params[0]
            output = get.ret
            file.write(
                f'  [{make_valid_symbol(input.name)}: {input.type.typescript_type()}]: {output.typescript_type()},\n')

    file.write("}\n")

    file.write(
        f'type {class_def.local_name}{template_full} = __{class_def.local_name}{template} ')
    if class_def.parent:
        # file.write(f"& {class_def.parent.typescript_type()}")

        # Typescript does not support type overriding, so we have to Omit the parent's type common keys
        # Keeping the code for basic inheritance in case we need it

        # Generating a defined Omit<> with a tuple of keys is possible, would it speed up things ?
        file.write(
            f"& Omit<{class_def.parent.typescript_type()}, keyof __{class_def.local_name}{template}>")
    file.write(";\n")


def write_enum(file: IO, class_def: Class):
    file.write(f"enum {class_def.local_name} {{\n")
    for f in class_def.fields:
        if f.default:
            if not isinstance(f.default, int):
                file.write(f'  {f.name} = "{f.default}",\n')
            else:
                file.write(f"  {f.name} = {f.default},\n")
    file.write("}\n")


written_count = 0


def write_tree(file: IO, name: str, tree_cursor: NamespaceTree, prev_name=""):
    global written_count
    if written_count % 100 == 0:
        print(f"writing {name}, written {written_count} namespaces")
    written_count += 1

    if name:
        if not prev_name:
            file.write(f"declare namespace {name} {{\n")
        else:
            file.write(f"namespace {name} {{\n")

    for cls in tree_cursor["classes"]:
        if cls.parent and cls.parent.name == "System.Enum":
            write_enum(file, cls)
        else:
            write_class(file, cls)

    for node in sorted(tree_cursor["nodes"]):
        write_tree(file, node, tree_cursor["nodes"][node], name)

    if name:
        file.write("}\n")


def write_type_map(file: IO):
    file.write("declare type TypeMap = {\n")
    for name, cls in parsed_types.items():
        if nameInFilter(name):
            file.write(f' "{name}": {cls.typescript_type()},\n')
    file.write("}\n")


for typename in dump:
    if nameInFilter(typename):
        parseClass(typename)
print("parsing done")

for type in parsed_types:
    passClass(parsed_types[type])

print("second pass done")

file = open("il2cpp.d.ts", 'w', encoding='utf-8')
for i in range(10):
    file.write(f"type G{i} = any;\n")
write_tree(file, "", namespace_tree)

file = open("typemap.d.ts", 'w', encoding='utf-8')
write_type_map(file)
