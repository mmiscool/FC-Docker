cd external
cd FreeCAD
git pull
mkdir ../icons
find . -name "*.svg" -type f -exec cp {} ../icons \;
cd ..
cd ..
