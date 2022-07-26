# Template for REFramework mod in typescript


## Setup

- Dependencies:
    - Python 3.8+
    - Node.js
    - npm
- Run `npm install`
- Copy the il2cpp-dump.json output file to IL2CPP
- run `ts-generator.py` in IL2CPP
    - You can configure which types are analyzed by editing `IL2CPP/type-filters.json`
    - Each element of the top-level array is parsed as a regex, then all types that match are used as starting points


# Compiling

- Just run `npx tstl`
