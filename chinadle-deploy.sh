#!/bin/bash

echo "whoami:"
whoami

cd /var/www
sudo rm -rf chinadle
sudo git clone git@github.com:z0gSh1u/chinadle.git
cd chinadle
sudo npm install
sudo npm run build-linux

cd /var/www/html
sudo rm -rf chinadle
sudo mkdir chinadle
sudo cp -r /var/www/chinadle/docs/* /var/www/html/chinadle

echo "chinadle deployed!"
