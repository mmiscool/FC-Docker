cd external
cd FreeCAD
mkdir ../icons
find . -name "*.svg" -type f -exec cp {} ../icons \;
cd ..
cd Mod
find . -name "*.svg" -type f -exec cp {} ../icons \;
cd ..

cd icons
for i in $( ls | grep [A-Z] ); do mv $i `echo $i | tr 'A-Z' 'a-z'`; done


for file in *'-'*
do
  mv "$file" "${file//-/_}"
done


cd ..
echo $PWD
rm ./icons/list.txt
ls ./icons/ -1a -I ".." -I "." > ./icons/list.txt

cd ..
