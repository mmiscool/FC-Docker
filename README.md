# FC-Docker


# TO BUILD
sudo docker build . -t kewl

# TO RUN
sudo docker run -d -p 8080:8080 kewl

# TO KILL ALL RUNNING DOCKERS
sudo docker kill $(sudo docker ps -q)


