import sys
import os
import shutil

mhrise_path=r"C:\Program Files (x86)\Steam\steamapps\common\MonsterHunterRise"
mod = sys.argv[1]

os.system("npx tstl -p " + mod)

shutil.copytree(
    os.path.join(mod, "dist"),
    os.path.join(mhrise_path, "reframework", "autorun"),
    dirs_exist_ok=True
)
