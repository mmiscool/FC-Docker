FROM ubuntu:bionic
ENV HOME /root
RUN apt update \
		&& apt install software-properties-common --no-install-recommends -y
RUN apt update
RUN curl -fsSL https://get.docker.com/rootless | sh
