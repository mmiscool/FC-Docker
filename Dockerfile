FROM ubuntu:bionic

ENV HOME /root

RUN apt update \
		&& apt install software-properties-common --no-install-recommends -y \
		&& add-apt-repository ppa:freecad-maintainers/freecad-stable -y \
		&& apt update  \
		&& apt install \
		xvfb \
		x11vnc \
		xdotool \
		fluxbox \
		software-properties-common \
		supervisor \
		nginx x11-xserver-utils \
		xterm \
		freecad \
		--no-install-recommends -y \
		&& apt-get clean autoclean \
		&& apt-get autoremove --yes \
		&& rm -rf /var/lib/{apt,dpkg,cache,log}/

WORKDIR /root/

ENV DISPLAY :0

ADD novnc novnc
ADD icons novnc/icons
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD start.sh start.sh

ADD localhost.conf /etc/nginx/sites-available/default

ADD resolution.py resolution.py
CMD ["/usr/bin/supervisord"]

EXPOSE 80
ADD Autoload_commandLister.py Autoload_commandLister.py
ADD index.html novnc/index.html
ADD fileServer /fileServer
EXPOSE 8000S