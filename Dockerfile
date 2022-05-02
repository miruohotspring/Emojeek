FROM node:12.4

# Amplify CLIのインストール
RUN apt update; apt install -y sudo
RUN sudo npm i -g @aws-amplify/cli@8.0.2 --unsafe-perm=true

# JDKのインストール
RUN apt install -y wget software-properties-common apt-transport-https
RUN wget -O- https://apt.corretto.aws/corretto.key | apt-key add - 
RUN add-apt-repository 'deb https://apt.corretto.aws stable main'
RUN apt update; apt-get install -y java-18-amazon-corretto-jdk

# コンテナでの作業領域
WORKDIR /var/www/app