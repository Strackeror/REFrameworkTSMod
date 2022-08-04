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
