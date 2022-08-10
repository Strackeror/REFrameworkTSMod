import os
import sys
from zipfile import ZipFile

os.chdir(os.path.dirname(__file__))


def zipfolder(foldername: str, zip_path: str):
    with ZipFile(zip_path, 'w') as zipfile:
        for root, dirs, files in os.walk(foldername):
            print(root, dirs, files)
            for file in files:
                filepath = os.path.join(root, file)
                zipfile.write(
                    filepath,
                    os.path.join('reframework', "autorun", os.path.relpath(
                        filepath,
                        foldername
                    )))


os.makedirs("output", exist_ok=True)
if len(sys.argv) > 1:
    mod_dirs = sys.argv[1:]
else:
    mod_dirs = [os.path.join("mod", f) for f in next(os.walk("mod"))[1]]
for m in mod_dirs:
    m = os.path.normpath(m)
    name = os.path.basename(m)
    os.system(f"npx tstl -p {m}")
    zipfolder(os.path.join(m, "dist"),
              os.path.join("output", f"{name}.zip"))
