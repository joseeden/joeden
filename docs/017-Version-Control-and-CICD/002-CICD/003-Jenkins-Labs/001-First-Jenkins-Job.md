---
title: "First Jenkins Job"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 1
last_update:
  date: 7/7/2022
---


To create a job, we can click the **New Item** on the left panel or simply click the **Create a job**.

<div class='img-center'>

![](/img/docs/jen1job.png)

</div>

Enter a project name in the field. For this example, we'll just select **Freestyle project** and then **Ok**. You can then configure the job in the next page where you will see different sections.

<div class='img-center'>

![](/img/docs/jen1job1.png)

</div>

- **Discard old builds** - this allows limiting the number of builds stored in history. This ensures that the builds doesn't take up space/memory.

    <div class='img-center'>

    ![](/img/docs/jen1job2.png)

    </div>

- **Source code management** - you can specify the git URL and the branch here. For now we'll just leavee it to **None**.

    <div class='img-center'>

    ![](/img/docs/jen1job3.png)

    </div>

- **Build Triggers** - if no option is selected, then the buidl will be triggered manually. In our example, we'll trigger the job manually.

    <div class='img-center'>

    ![](/img/docs/jen1job4.png)

    </div>

- **Build Steps** - here we can define what we want the job to do.

    <div class='img-center'>

    ![](/img/docs/jen1job5.png)

    </div>

In our example, we'll select **execute shell**. Then in the command field, enter *echo "hello world!"*.

<div class='img-center'>

![](/img/docs/jen1job6.png)

</div>
<div class='img-center'>

![](/img/docs/jen1job7.png)

</div>

The last section is the **Post-build** - this is where we normally configure the notification. For this example, we'll leave this section blank. Click **Save**.

<div class='img-center'>

![](/img/docs/jen1job8.png)

</div>

Going back to our dashboard, we see our first job.

<div class='img-center'>

![](/img/docs/jen1job9.png)

</div>

To run our first Jenkins job, select the job and click **Build Now** on the left panel.

<div class='img-center'>

![](/img/docs/jenbuildnow.png)

</div>

Check the finished build under the **Build History**. Then on the build page, click the **Console Output** on the left panel to see the output.

<div class='img-center'>

![](/img/docs/jen1buildnow.png)

</div>
<div class='img-center'>

![](/img/docs/jen1buildnow2.png)

</div>

<div class='img-center'>

![](/img/docs/tjenplugins1.png)

</div>

