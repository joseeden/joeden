---
title: "Python Virtual Environments"
description: "Python Virtual Environments"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 40
last_update:
  date: 10/28/2019
---


## Overview

These are used to isolate environments and resolve *dependency conflict resolution*.

- Ensures projects have isolated siloes where they live
- Projects have their own dependency tree that don't interfere with one another.


## Python Dependencies

You will often use 3rd-party libraries which doesn't come along with Python. You'll have to import and install them before they can be used.

- Normally installed using *pip* or *easy_install* 
- Libraries are pulled from the **pupi.org** or **Python Package Index** 

<div class='img-center'>

![](/img/docs/pypiorg.png)

</div>



## Installing Libraries

To install a library, as example, django:

```bash
pip install django
```

To install a specific version of django:

```bash
pip install django==2.2.12
```

To check the version of Django installed, you can run any of the commands below:

```bash
django --version
python -m django --version
```

You can also view the versions of all installed packages, including Django:

```bash
pip freeze
python -m pip freeze
```

To save all of these data (versions of each modules) to be reused or processed later, you can forward them to a file.

```bash
pip freeze > module-versions.txt
```

To upgrade to a newer version:

```bash
pip install --upgrade django
```

To uninstall it, don't delete the folder, instead:

```bash
pip uninstall django
```

Another example: installing the "site" library:

```bash
import site
print(site.getsitepackages())
```


## Using a requirements.txt

Another way to install multiple third parties with just a single command is to put them into a single *requirements.txt* file and use *pip* to to do a bulk-install. Note that it's recommended to install modules for a project in a virtual environment.

To install from a requirements file:

```bash
pip install -r requirements.txt
```


## Using env

In the previous steps, the django version installed was 2.2.12. If we are to install a new version, v3.0, then it will override and uninstall the v2.2.12. Some projects need specific versions of a library and this is where virtual environments come into play. Virtual environments exist to isolate projects and their dependencies from one another.

To create a virtual environment, we can use venv:

```bash
python -m venv my-project-1
```

After you run this, a folder for the virtual environment will be created.

```bash
$ ll
total 0
drwxr-xr-x 1 User123456 197610 0 Sep 14 12:16 my-project-1/

$ ll my-project-1/
total 5
drwxr-xr-x 1 User123456 197610   0 Sep 14 12:16 Include/
drwxr-xr-x 1 User123456 197610   0 Sep 14 12:16 Lib/
-rw-r--r-- 1 User123456 197610 121 Sep 14 12:16 pyvenv.cfg
drwxr-xr-x 1 User123456 197610   0 Sep 14 12:16 Scripts/
```

To activate a virtual environment, run the "activate" script inside the *Scripts* folder of the project. 

```bash
$ source ./my-project-1/Scripts/activate
$
(my-project-1) 
User123456@testbox MINGW64 ~/Desktop/Git/5-Virtual-Envs
```

Notice that the name of the virtual environment can now be seen at the prompt. To exit out of the virtual environment, simply run

```bash
deactivate
```


## Using venv

Another way to create virtual environments is through *virtual env*. Note that virtual env doesn't ship alongside your Python installation. To install virtual env:

```bash
pip install virtualenv
```

This take a similar step to create a new environment and activate it:

```bash
virtualenv my-project-2

# you can also use
python -m virtualenv my-project-2
```

You can create the virtual environment with a different Python installation by using the `-p` flag:

```bash
# Check the python installations you currently have
$ where python
C:\Users\User123456\AppData\Local\Programs\Python\Python39\python.exe
C:\Users\User123456\AppData\Local\Programs\Python\Python38\python.exe

# You can choose from this two and create a virtual env with that version
python -m virtualenv -p
```



## Using virtualenvwrapper

> *This is what I am using in labs and even at work. Treat this section as standalone, and can be setup even without the venv or env*

This is another virtualenv library which wraps up some useful management functionality for virtualenv. One feature of this is it manages a single location of all your projects. Unlike virtualenv and env where the project folder is created on your current working directory, virtualenvwrapper creates a folder is the user's home directory.

virtualenvwrapper maintains this folder where all your environment folders are created by default. You can setup your own directory where all the virtual environments folder will be created by creating the variable **WORKON_HOME**.

> *I had some problems when I was trying this one. As a solution, I just uninstalled any existing virtualenvwrapper installed on my system and do a fresh install.*

To do a fresh install:

```bash
sudo pip uninstall virtualenvwrapper
sudo pip install virtualenvwrapper
```

Next, append this to your **.bashrc** file:

```bash

# Change the WORKON_HOME path to your directory where you want all your virtual environment folders created
export WORKON_HOME='/mnt/c/Users/User123456/Desktop/Git/5-Virtual-Envs'
export VIRTUALENVWRAPPER_PYTHON='/usr/bin/python3'
source /usr/local/bin/virtualenvwrapper.sh
```

To create a virtual environment:

```bash
mkvirtualenv <name>

# Sample
User123456@testbox:~$ mkvirtualenv project-a
created virtual environment CPython3.8.10.final.0-64 in 21319ms...
(project-a) User123456@testbox:~$

# Note that to create another virtual envionment, exit out of the previous virtual environment by running "deactivate"
User123456@testbox:~$ mkvirtualenv project-b
created virtual environment CPython3.8.10.final.0-64 in 21319ms...
(project-b) User123456@testbox:~$
```

To see all your virtual environments:

```bash
User123456@testbox:~$ workon
project-a
project-b
```

To switch between virtual environments:

```bash
User123456@testbox:~$ workon project-b
(project-b) User123456@testbox:~$
```

To exit out of a virtual environment:

```bash
(project-b) User123456@testbox:~$ deactivate
User123456@testbox:~$
```


## ERRORS

### mkvirtualenv: command not found

If you get an error "command not found", this might mean virtualenvwrapper was not properly installed. You can simply re-do the installation.
I had issues also when trying the virtualenvwrapper on Git Bash in VSCode so I decided to run the commands below in WSL.

```bash
sudo pip uninstall virtualenv -y 
sudo pip uninstall virtualenvwrapper -y
sudo pip install virtualenv
sudo pip install virtualenvwrapper
echo "WORKON_HOME='/mnt/c/Users/User123456/Desktop/Git/5-Virtual-Envs'" >> ~/.bashrc
echo "source `which virtualenvwrapper.sh`" >> ~/.bashrc
. ~/.bashrc
```


### virtualenvwrapper Command '' not found, but can be installed with...

When you create a virtual environment using the *mkvirtualenv* command, you might see this error message:

```bash
User123456@testbox:/mnt/c/Users/User123456$ mkvirtualenv project-a

Command '' not found, but can be installed with:

sudo apt install mailutils-mh  # version 1:3.7-2.1, or
sudo apt install meshio-tools  # version 4.0.4-1
sudo apt install mmh           # version 0.4-2
sudo apt install nmh           # version 1.7.1-6
sudo apt install termtris      # version 1.3-1
```

To resolve this, add the lins below (in this order) to your **.bashrc** file:

```bash 
export VIRTUALENVWRAPPER_PYTHON='/usr/bin/python3'
source /usr/local/bin/virtualenvwrapper.sh

## Note that the path depends on where your Python is installed. To check
which python
which python3
```

## References

- [Where is virtualenvwrapper.sh after pip install?](https://stackoverflow.com/questions/12647266/where-is-virtualenvwrapper-sh-after-pip-install)
- [Python Virtual Environments](https://www.cbtnuggets.com/it-training/skills/python-virtual-environments)




