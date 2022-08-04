import sys
import os
import shutil
import json

mhrise_path = json.load(open("dist/RisePath.json"))["RisePath"]
for mod in sys.argv[1:]:
    os.system("npx tstl -p " + mod)

    shutil.copytree(
        os.path.join(mod, "dist"),
        os.path.join(mhrise_path, "reframework", "autorun"),
        dirs_exist_ok=True
    )
