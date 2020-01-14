cd external
git clone https://github.com/FreeCAD/FreeCAD.git
cd FreeCAD
git pull
mkdir ../icons
find . -name "*.svg" -type f -exec cp {} ../icons \;
cd ..
cd ..
