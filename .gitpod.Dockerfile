FROM ubuntu:bionic
RUN apt update
# Install Docker
RUN apt install curl uidmap iptables wget dirmngr -y

#RUN curl -fsSL https:/download.docker.com/linux/ubuntu/gpg | apt-key add -
#RUN apt-key fingerprint 0EBFCD88
#RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
#RUN apt-get update -y
#RUN apt-get install -y docker-ce docker-ce-cli containerd.io

