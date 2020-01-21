FROM ubuntu:bionic

ENV HOME /root

RUN apt update \
		&& apt install nginx python3 python3-pip -y \
		&& echo "daemon off;" >> /etc/nginx/nginx.conf 
RUN pip3 install docker
RUN apt install -y supervisor
ADD html /html

#ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
#CMD ["/usr/bin/supervisord"]


ADD localhost.conf /etc/nginx/sites-available/default
ADD manager /manager
CMD ls /fcUsers/
CMD nginx & python3 /manager/sessions.py
EXPOSE 80
