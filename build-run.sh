mkdir external_dependencies
cd external_dependencies
for each in ./*.sh ; do bash $each ; done
cd ..
ls





#sudo docker kill $(sudo docker ps -q)




sudo docker ps -q --filter ancestor="kewl" | xargs -r sudo docker stop

sudo docker run -d -v $(pwd):/workspace -p 8181:8181 sapk/cloud9 --auth username:password
sudo docker build . -t kewl
sudo docker run -d -p 80:80 kewl

echo IP address of docker containers are
sudo docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  $(sudo docker ps -q)
#sleep 10
#firefox $(sudo docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  $(sudo docker ps -q)) &
