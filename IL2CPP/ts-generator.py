from __future__ import annotations

import json
import os
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pprint import pprint
from string import ascii_letters, digits
from typing import IO, Dict, List, TypedDict


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
    typescript_type: str = ""
    namespaces: List[str] = field(default_factory=list)
    methods: List[Method] = field(default_factory=list)
    fields: List[Field] = field(default_factory=list)

    def __repr__(self):
        return f"{self.name}, {self.namespaces}"


dump: Dict[str, Dict] = json.load(open("il2cpp_dump.json", encoding="utf-8"))
print("json loaded")

filter = sys.argv[1]
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
}

for k, t in converted_types.items():
    parsed_types[k] = Class(name=k, typescript_type=t)

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
def valid_symbol(str: str):
    if not str:
        return False
    if set(str).difference(ascii_letters + digits + "_"):
        return False

    if str in typescript_keyword:
        return False
    return True

def make_valid_symbol(pstr: str):
    if not pstr:
        pstr = "__"

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


parsed_count = 0


def parseClass(name: str, force: bool = False):
    global parsed_count
    global parsed_types
    global namespace_tree

    if name in parsed_types:
        return parsed_types[name]

    entry = dump[name]
    if filter and (not name.startswith(filter)) and not force:
        return parsed_types["Any"]

    if parsed_count % 100 == 0:
        print(f"parsing {name}, parsed {parsed_count} types")
    parsed_count += 1

    new_class = Class()
    new_class.name = name
    parsed_types[name] = new_class


    generic_param = None
    if name.endswith("]"):
        if name.endswith("[]"):
            generic_param = name[:-2]
        elif name.endswith("[,]"):
            generic_param = name[:-3] + "_2"
        elif name.endswith("[,,]"):
            generic_param = name[:-4] + "_3"
        name = "System.Array"
    else:
        index = name.find("<")
        if index > 0:
            generic_param = name[index:]
            name = name[:index]
            if generic_param[-1] == ">":
                generic_param = generic_param[1:-1]

    #workarounds for weird naming stuff
    if name.endswith("."):
        name += "__"
    name = name.replace('`', '__')
    name = name.replace('!', '__')
    new_class.namespaces = name.split('.')
    if new_class.namespaces[-1] == "System":
        new_class.namespaces[-1] += "_"

    new_class.typescript_type = '.'.join(new_class.namespaces)
    tree_cursor = namespace_tree
    for k in new_class.namespaces:
        tree_cursor = tree_cursor["nodes"][k]
    tree_cursor["classes"].append(new_class)
    
    if generic_param:
        new_class.local_name = make_valid_symbol(generic_param)
    else:
        new_class.local_name = "T"
    new_class.typescript_type += f'.{new_class.local_name}'

    if "parent" in entry:
        new_class.parent = parseClass(entry["parent"], force=True)

    if "methods" in entry:
        for _name, _method in entry["methods"].items():
            # Avoid full collection types
            if name == "System.Array" and "Static" in _method["flags"]:
                continue
            new_method = parseMethod(new_class, _name, _method)
            new_class.methods.append(new_method)
    if "fields" in entry:
        for _name, _field in entry["fields"].items():
            default = ""
            if "default" in _field:
                default = _field["default"]
            new_class.fields.append(
                Field(name=_name, type=parseClass(_field["type"]), default=default))
    return new_class


def write_method(file: IO, class_def: Class, method: Method, name: str):
    if not valid_symbol(name):
        file.write(f'  "{name}"')
    else:
        file.write("  " + name)

    file.write(f": (this: {class_def.typescript_type}")
    for p in method.params:
        file.write(f", {p.name}: {p.type.typescript_type}")
    file.write(f") => {method.ret.typescript_type};\n")


def write_class(file: IO, class_def: Class):
    file.write(f"interface __{class_def.local_name} ")
    file.write("{\n")
    for f in class_def.fields:
        if "<" in f.name:
            file.write(f'  "{f.name}": {f.type.typescript_type},\n')
        else:
            file.write(f'  {f.name}: {f.type.typescript_type},\n')

    method_name_map = defaultdict(list)
    method_full_map = defaultdict(list)
    method_full_ret_map = defaultdict(list)

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

    file.write("}\n")

    file.write(f'type {class_def.local_name} = __{class_def.local_name} ')
    if class_def.parent:
        file.write(f"& {class_def.parent.typescript_type}")
    file.write(";\n")


def write_enum(file: IO, class_def: Class):
    file.write("enum T {\n")
    for f in class_def.fields:
        if f.default:
            if not isinstance(f.default, int):
                file.write(f'  {f.name} = "{f.default}",\n')
            else:
                file.write(f"  {f.name} = {f.default},\n")
    file.write("}\n")


written_count = 0


def write_tree(file:IO, name:str, tree_cursor:NamespaceTree, prev_name=""):
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
        file.write(f' "{name}": {cls.typescript_type},\n')
    file.write("}\n")


for typename in dump:
    parseClass(typename)
file = open("il2cpp.d.ts", 'w', encoding='utf-8')
write_tree(file, "", namespace_tree)
write_type_map(file)
