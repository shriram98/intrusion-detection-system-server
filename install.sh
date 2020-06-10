sudo apt update;
sudo apt upgrade -y;
sudo apt install -y python3 && python3-pip;
git clone https://github.com/shriram98/intrusion-detection-system-server.git
cd intrusion-detection-system-server
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install node
npm install

