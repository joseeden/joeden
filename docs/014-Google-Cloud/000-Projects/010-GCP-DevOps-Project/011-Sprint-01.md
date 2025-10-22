---
title: "Sprint 01"
tags: 
- Google Cloud
- DevOps
- Cloud
sidebar_position: 11
last_update:
  date: 9/21/2020
---

## Todo

Todo:

✔️ Create a Github Repo and clone it locally.
✔️ Setup Github repo according to best practices.
✔️ Code the application locally.
✔️ Test the application locally.


## Steps 

1. Create the Github repository. 
    
    ![](/img/docs/gcp-devops-project-1.png)

2. Clone the repository locally.

    ```bash
    joseeden@EdenJose:4-Test-repos$ git clone https://github.com/joseeden/gcp-devops-project.git
    Cloning into 'gcp-devops-project'...
    remote: Enumerating objects: 4, done.
    remote: Counting objects: 100% (4/4), done.
    remote: Compressing objects: 100% (3/3), done.
    remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
    Unpacking objects: 100% (4/4), 1.52 KiB | 11.00 KiB/s, done.
    joseeden@EdenJose:4-Test-repos$
    joseeden@EdenJose:4-Test-repos$ ls -la
    total 0
    drwxrwxrwx 1 joseeden joseeden 512 Jan 26 01:34 .
    drwxrwxrwx 1 joseeden joseeden 512 Jan 26 01:34 ..
    drwxr-xr-x 1 joseeden joseeden 512 Jan 26 01:34 gcp-devops-project
    joseeden@EdenJose:4-Test-repos$
    joseeden@EdenJose:4-Test-repos$ cd gcp-devops-project/
    joseeden@EdenJose:gcp-devops-project$ ls -la
    total 4
    drwxr-xr-x 1 joseeden joseeden  512 Jan 26 01:34 .
    drwxrwxrwx 1 joseeden joseeden  512 Jan 26 01:34 ..
    drwxr-xr-x 1 joseeden joseeden  512 Jan 26 01:34 .git
    -rw-r--r-- 1 joseeden joseeden 1066 Jan 26 01:34 LICENSE
    -rw-r--r-- 1 joseeden joseeden   93 Jan 26 01:36 README.md 
    ```

3. Enable branch protection on the main branch. 


    ![](/img/docs/gcp-devops-project-enable-branch-protections-how-it-is.png)

    To do this, go back to the Github repo > Settings > Branches > Add branch protection rule


    ![](/img/docs/gcp-devops-projct-enabled-branch-protection-settings.png)


    Put in "master" for branch  name and then tick the box for "Require a pull reqeust before merging. Click Create at the bottom.


    ![](/img/docs/gcp-devops-project-enabled-branch-protection-require-pull-request-with-borders.png)


    ![](/img/docs/gcp-devops-project-enabled-branch-protection-doneee.png)


    **Note**: In a team setting, you may need to add an "Approval" stage so that any changes will be reviewed by another team member before it is pushed to the master branch.

4. Back in the terminal, create a feature branch so that we don't commit directly to the master branch.

    ```bash
    joseeden@EdenJose:gcp-devops-project$ git branch
    * master
    joseeden@EdenJose:gcp-devops-project$ git checkout -b "feature/sprint-01"
    Switched to a new branch 'feature/sprint-01'
    joseeden@EdenJose:gcp-devops-project$
    joseeden@EdenJose:gcp-devops-project$ git branch
    * feature/sprint-01
    master 
    ```

5. Try to change the README file and do a <code>git push.</code> If you encounter an error, make sure that you have [generated your SSH keys and added them to your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). Also, you might need to modidy the <code>.git/config</code> in your project directory.

    ```bash
    [remote "origin"]
    url =  git@github.com:joseeden/gcp-devops-project.git
    fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "master"]
    remote = origin
    merge = refs/heads/master
    [branch "feature/sprint-01"]
    remote = origin
    merge = refs/heads/feature/sprint-01
    ```

    Set upstream branch as the feature branch.

    ```bash
    git add . 
    git commit -m "Updated README" 
    git push --set-upstream origin feature/sprint-01
    ```


6. **Shortcuts**. As a shortcut, we can add an alias in out <code>~/.bashrc</code>.

    ```bash
    alias gitacp='git add -A; git commit; git push' 
    alias gitst="git status"      
    ```

    ```bash
    source ~/.bashrc
    ```

7. Back at the Github repo, a new message will appear. Click the "Compare & pull request". The original text and the changes will appear at the bottom, highlighted with red and green. In the "Add a description" box, specify the change made and then click "Create pull request".

    ![](/img/docs/gcp-devops-project-add-simple-change-to-readme.png)

    ![](/img/docs/gcp-devops-project-create-pull-requestsss.png)

8. In a team setting, a review will be done by another team member before it is merged. The members names will appear in the "Reviewer" section at the left. This is a self project, simply clik the Merge pull request > Confirm merge.

    ![](/img/docs/merging-pull-request-for-self-project.png)

    ![](/img/docs/gcp-devops-project-merged-pull-request-done-self-projectsssss.png)
    
    There is an option to delete the branch after every merge to the master branch, as this is a common practice. Whenever changes are merged to the master branch, it means that all changes have undergone testing, has been reviewed, and no additional change is needed. 

    But since this is a self-project, we can keep the branch open for now. 

9. Back in the project directory, create the files. 

    ```python title="app.py"
    from flask import flask 
    app = Flask(__name__) 

    @app.route('/')
    def hello_world(): 
        return 'This is a simple Flask application' 
    ```


    ```bash title="requirements.txt"
    flask 
    ```

    ```Dockerfile title="Dockerfile"
    FROM python:3.8-slim-buster 

    WORKDIR /app

    COPY requirements.txt requirements.txt 
    RUN pip3 install -r requirements.txt

    COPY . .

    CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
    ```

10. Test the application locally. To do this, we will need to have [Docker desktop installed locally](https://docs.docker.com/desktop/install/windows-install/).

    ```bash
    docker build -t simple-flask-app . 
    ```

    Check the created image. 

    ```bash 
    joseeden@EdenJose:gcp-devops-project$ docker images
    REPOSITORY         TAG       IMAGE ID       CREATED         SIZE
    simple-flask-app   latest    6cf9598ecf38   2 minutes ago   129MB
    ```

11. Run the docker container locally.

    ```bash
    joseeden@EdenJose:gcp-devops-project$ docker run -p 5000:5000 simple-flask-app
    * Debug mode: off
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on all addresses (0.0.0.0)
    * Running on http://127.0.0.1:5000
    * Running on http://172.17.0.2:5000
    ```

    Open a browser and navigate to the URL and port:

    ```bash
    localhost:5000 
    ```

    ![](/img/docs/gcp-devops-project-flask-application-is-alive-can-be-accessed-through-browser.png)

12. Since the application is running locally, we can now commit the changes. But first, make sure to check your current branch and verify the changes. Afterwards, commit and push the changes. 

    
    ```bash
    joseeden@EdenJose:gcp-devops-project$ git branch
    * feature/sprint-01
    master
    joseeden@EdenJose:gcp-devops-project$ gitst
    On branch feature/sprint-01
    Your branch is up to date with 'origin/feature/sprint-01'.

    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
            modified:   README.md

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
            Dockerfile
            app.py
            requirements.txt

    no changes added to commit (use "git add" and/or "git commit -a")
    joseeden@EdenJose:gcp-devops-project$
    joseeden@EdenJose:gcp-devops-project$ gitacp
    [feature/sprint-01 e604161] Added files for containerized flask app.
    4 files changed, 24 insertions(+), 1 deletion(-)
    create mode 100644 Dockerfile
    create mode 100644 app.py
    create mode 100644 requirements.txt
    Enumerating objects: 8, done.
    Counting objects: 100% (8/8), done.
    Delta compression using up to 4 threads
    Compressing objects: 100% (5/5), done.
    Writing objects: 100% (6/6), 826 bytes | 16.00 KiB/s, done.
    Total 6 (delta 0), reused 0 (delta 0)
    To github.com:joseeden/gcp-devops-project.git
    d43bee8..e604161  feature/sprint-01 -> feature/sprint-01
    ```
    ```bash
    ## COMMIT 
    Added files for containerized flask app.
    # Please enter the commit message for your changes. Lines starting
    # with '#' will be ignored, and an empty message aborts the commit.
    #
    # On branch feature/sprint-01
    # Your branch is up to date with 'origin/feature/sprint-01'.
    #
    # Changes to be committed:
    #       new file:   Dockerfile
    #       modified:   README.md
    #       new file:   app.py
    #       new file:   requirements.txt
    #   
    ```

13. Back at the Github repo, switch to the feature branch and open a pull request. 

    ![](/img/docs/gcp-devops-project-working-app-pushing-committing-changes-to-github.png)

    ![](/img/docs/gcp-devops-project-opened-pull-requests-for-changes-in-the-flask-app.png)

    Merge the PR.

    ![](/img/docs/gcp-devops-project-merged-working-changes-to-the-repo.png)


14. At this point, we can now safely delete the feature branch. Click Delete branch.

    ![](/img/docs/gcp-devops-project-safely-deletee-feature-branch-sprint-01.png)

