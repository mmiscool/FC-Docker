cd external
git clone https://github.com/FreeCAD/FreeCAD.git
mkdir ../icons
cd FreeCAD
git pull
find . -name "*.svg" -type f -exec cp {} ../../icons \;
cd ..
cd ..
