docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}:{{.ID}}'  $(docker run -d kewl )
