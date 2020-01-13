#git clone https://github.com/FreeCAD/FreeCAD.git
#mkdir icons
#cd FreeCAD
#find . -name "*.svg" -type f -exec cp {} ../icons \;

#sudo docker kill $(sudo docker ps -q)
sudo docker ps -q --filter ancestor="kewl" | xargs -r sudo docker stop

sudo docker run -d -v $(pwd):/workspace -p 8181:8181 sapk/cloud9 --auth username:password
sudo docker build . -t kewl
sudo docker run -d -p 80:80 kewl

echo IP address of docker containers are
sudo docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  $(sudo docker ps -q)
#sleep 10
#firefox $(sudo docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  $(sudo docker ps -q)) &
