cd external
cd FreeCAD
git pull
mkdir ../icons
find . -name "*.svg" -type f -exec cp {} ../icons \;
ls ../icons/ -1a -I ".." -I "." > ../icons/list.txt
cd ..
cd ..
