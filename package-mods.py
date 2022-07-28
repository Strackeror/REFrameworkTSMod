import os
import shutil
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
mod_dirs = next(os.walk("mod"))[1]
for m in mod_dirs:
    name = os.path.basename(m)
    shutil.copy(os.path.join("IL2CPP", "IL2CPP.lua"), os.path.join("mod", name, "dist", name))
    zipfolder(os.path.join("mod", name, "dist"), os.path.join("output", f"{name}.zip"))
