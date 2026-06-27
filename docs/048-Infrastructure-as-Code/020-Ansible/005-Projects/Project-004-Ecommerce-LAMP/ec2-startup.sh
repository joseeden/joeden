
#cloud-config
system_info:
    default_user:
        name: eden

runcmd:
- sudo hostnamectl set-hostname ansible-controller
- sudo sed -i "s/localhost/localhost ansible-controller/" /etc/hosts
- echo "PS1=\"\u@\H:\W $ \"" >> .bashrc


