FROM ubuntu:20.04

RUN apt update && \
    apt install -y ca-certificates-java && \
    update-ca-certificates -f && \
    apt install -y curl openjdk-17-jdk && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs imagemagick

RUN npm install -g yarn firebase-tools

RUN ln -sf /usr/share/zoneinfo/Japan /etc/localtime
