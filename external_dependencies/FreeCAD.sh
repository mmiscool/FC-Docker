cd external
cd FreeCAD
mkdir ../icons
find . -name "*.svg" -type f -exec cp {} ../icons \;
cd ..
cd Mod
find . -name "*.svg" -type f -exec cp {} ../icons \;


ls ../icons/ -1a -I ".." -I "." > ../icons/list.txt
cd ..
cd ..
