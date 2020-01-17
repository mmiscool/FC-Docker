FROM ubuntu:bionic
ENV HOME /root
RUN apt update \
		&& apt install software-properties-common --no-install-recommends -y
RUN apt update
RUN apt-get install apt-transport-https ca-certificates curl software-properties-common -y
RUN apt update
RUN apt install docker-ce -y


# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && \
#     sudo apt-get install -yq bastet && \
#     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/
