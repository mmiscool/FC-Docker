git clone https://github.com/FreeCAD/FreeCAD.git
cd FreeCAD
git pull
cd ..


sudo docker kill $(sudo docker ps -q)
sudo docker build . -t kewl
sudo docker run -d -p 8080:8080 -p 8000:8000 -p 80:80 kewl

