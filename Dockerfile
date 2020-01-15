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
		software-properties-common \
		supervisor \
		nginx x11-xserver-utils \
		xterm \
		freecad \
		jwm \
		--no-install-recommends -y \
		&& apt-get clean autoclean \
		&& apt-get autoremove --yes \
		&& rm -rf /var/lib/{apt,dpkg,cache,log}/


RUN apt install \
		firefox \
		mousepad \
		thunar \
		nano \
		--no-install-recommends -y 
RUN apt install git python-numpy python-pyside -y

ADD external_dependencies/external/Mod /root/.FreeCAD/Mod 

ADD system.jwmrc /etc/jwm/system.jwmrc

# RUN apt remove freecad -y 
# RUN add-apt-repository ppa:freecad-maintainers/freecad-daily -y 
# RUN apt-get update 
# RUN apt-get install freecad-daily -y 

EXPOSE 80

WORKDIR /root/

ENV DISPLAY :0

ADD external_dependencies/external/Droopy /fileServer
ADD external_dependencies/external/noVNC /novnc
ADD external_dependencies/external/icons /novnc/icons

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD start.sh /start.sh

ADD localhost.conf /etc/nginx/sites-available/default

ADD resolution.py /resolution.py
CMD ["/usr/bin/supervisord"]


ADD server.py /server.py

ADD settings.json settings.json
ADD user.cfg /root/.FreeCAD/user.cfg
RUN ln /root/.FreeCAD/user.cfg /root/user.cfg
ADD index.html /novnc/index.html
ADD FC-APP.js /novnc/FC-APP.js
