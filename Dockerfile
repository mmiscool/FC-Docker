FROM ubuntu:bionic

ENV HOME /root
ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

RUN dpkg --add-architecture i386
RUN apt update
RUN apt install xvfb x11vnc xdotool wget tar net-tools fluxbox software-properties-common -y

WORKDIR /root/

RUN add-apt-repository ppa:freecad-maintainers/freecad-stable -y
RUN apt update
RUN apt install solvespace freecad -y
RUN apt install supervisor -y
RUN apt install nginx -y
RUN apt install thunar -y
RUN apt install firefox -y
RUN apt install mousepad -y
RUN apt install x11-xserver-utils -y


ADD ngrok /bin/ngrok

ENV DISPLAY :0

ADD novnc novnc
ADD icons novnc/icons
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
#ADD Autoload_commandLister.py Autoload_commandLister.py
ADD start.sh start.sh
ADD hide.py /root/.FreeCAD/Macro/hide.py
ADD localhost.conf /etc/nginx/sites-available/default

ADD resolution.py resolution.py
CMD ["/usr/bin/supervisord"]

EXPOSE 80
ADD Autoload_commandLister.py Autoload_commandLister.py
ADD index.html novnc/index.html
