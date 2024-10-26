#cloud-config
system_info:
  default_user:
    name: eden

runcmd:
 - 'sudo hostnamectl set-hostname controller'
 - 'sudo sed -i "s/localhost/localhost controller/" /etc/hosts'
 - 'echo "PS1=\"[\u@\H: \W] $ \"" >> .bashrc'
 - 'sudo yum update -y'
 - 'sudo yum install -y vim nano wget bash-completion firewalld'
 - 'sudo yum install -y epel-release'
 - 'sudo yum install -y python3'
 - 'sudo yum install -y python3-pip python-devel'
 - 'sudo yum groupinstall "development tools"'
 - 'sudo pip install --upgrade pip'
 - 'sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm'
 - 'sudo yum install -y ansible'