---
title: "MongoDB Cloud"
description: "MongoDB in the Cloud"
tags: [Data Engineering, Databases, MongoDB, NoSQL]
sidebar_position: 30
last_update:
  date: 12/8/2021
---



## MongoLabs (Now MongoDB Cloud)

Short crash course on how to use [MongoLabs](https://mlab.com/).
Note that as of December 2021, MongoLabs has been acquired by [MongoDB Cloud](https://cloud.mongodb.com/v2#/org/61aeacf3cf271d40e56ae014/).

> *If you created your account recently, sign in with MongoDB Atlas instead. 
> mLab has been closed to new account creation since February 2019.*

In the MongoDB cloud, I created a cluster. I just used the defaults.

![](/img/docs/acme-mongodb.png)

I then create a username and password.

![](/img/docs/acme-mongo-uname-pw.png)

For the connection, I chose to connect from my local environment for now. Afterwards, click **Finish and Close**.

![](/img/docs/acme-mongo-localconnect.png)

![](/img/docs/acme-mongo-finish.png)

![](/img/docs/acme-mongo-provisioning.png)

![](/img/docs/acme-mongo-active.png)

Once acive, click the cluster name, **Cluster0**, and then open the **Collections** tab. Hit **Add my Own Data**.

![](/img/docs/acme-mongo-new-collections.png)

In the prompt window, enter a database name and a collections name. This will now also create a new database.

![](/img/docs/acme-mongo-newdb-collect.png)

![](/img/docs/acme-mongo-newdb-active.png)

To add data to the collection, clickk the **Insert Document** on the right. In the **Insert to Collection** prompt, enter a value then hit **Insert**.

![](/img/docs/acme-mongo-newcollect-data.png)

![](/img/docs/acme-mongo-newcollect-data-2.png)
