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


RUN apt install \
		firefox \
		mousepad \
		nano \
		--no-install-recommends -y 
		
# RUN apt remove freecad
# RUN sudo add-apt-repository ppa:freecad-maintainers/freecad-daily
# RUN sudo apt-get update
# RUN sudo apt-get install freecad-daily

EXPOSE 80

WORKDIR /root/
RUN mkdir /root/.FreeCAD


ENV DISPLAY :0
ADD FreeCAD_stylesheets /root/.FreeCAD/Gui/Stylesheets/

ADD fileServer /fileServer
ADD novnc /novnc
ADD icons /novnc/icons
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



