---
title: Attaching multiple EBS volumes
tags: [Linux, AWS, Labs]
# sidebar_position: 99
last_update:
  date: 2/27/2022
---

![](/img/docs/ebs-blocks.png)

## Attaching multiple EBS volumes at the same time 

Just a short note. I created three EBS volumes to be used for my storage labs in Linux.
I was going to attach them to a single instance at the same time but the **Attach volume** is greyed out in the **Actions** tab.

![](/img/docs/ebs-attach-greyed-out.png)

However, if you mark them one by one, the **Attach volume** can be selected.

![](/img/docs/ebs-not-greyed-out.png)


## Summary

- Multiple EBS volumes can be deleted at the same time
- Multiple EBS volumes can be attached to the same instance, but only one at a time
- Snapshots can be created for multiple volumes simultaneously


## Notes 

- AWS frequently changes their UI and functionalities so they may allow attaching volumes simultaneously in the future.
- Also, this is just trivial matter since this probably won't matter if the volumes and instances are spun up in an automated way.


