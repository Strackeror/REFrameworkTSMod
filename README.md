# Template for REFramework mod in typescript


## Setup

- Dependencies:
    - Python 3.8+
    - Node.js
    - npm
- Run `npm install`
- Copy the il2cpp-dump.json output file to IL2CPP
- `cd` into IL2CPP and run `ts-generator.py`
    - You can add an argument to filter which types are dumped, non-included types fall back to 'any'
    - This is recommended as typescript can run out of memory when trying to use the full dump


# Compiling

- Just run `npx tstl`
