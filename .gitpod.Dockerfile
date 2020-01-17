FROM ubuntu:bionic
ENV HOME /root
RUN apt update
# Install Docker
RUN apt install curl wget dirmngr apt-transport-https lsb-release ca-certificates software-properties-common gnupg-agent -y

RUN curl -fsSL https:/download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update -y
RUN apt-get install -y docker-ce docker-ce-cli containerd.io

