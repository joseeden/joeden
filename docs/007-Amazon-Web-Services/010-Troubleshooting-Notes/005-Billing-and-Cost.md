---
title: Billing and Cost Management
tags: [Linux, AWS, Labs]
sidebar_position: 5
last_update:
  date: 2/27/2022
---

## Cost Explorer not showing data

From AWS homepage, I can see I have monthly charges under **Cost and Usage**:

![](/img/docs/1030-aws-bill-cost-and-usage-widget-display.png)

I click **Go to Billing and Cost Management** and I see the same figures under **Cost breakdown**.

![](/img/docs/1030-aws-bill-cost-breakdown-widget.png)

I clicked the drop down menu and group costs by **Region** to get a better idea where the costs are coming from.

![](/img/docs/1030-aws-bill-cost-breakdown-widget-group-by-cost.png)

When I clicked **Analyze your costs in Cost Explorer**, I don't see any data.

![](/img/docs/1030-aws-bill-cost-and-usage-report-no-data.png)

Cause: I had credits applied for my previous months and the credits is being added to the graph, which then cancels out the charges.

Solution: Filter our the credits to display only the raw costs. 

![](/img/docs/1030-aws-bill-cost-and-usage-report-filter-exclude-credits.png)

After filtering for raw costs:

![](/img/docs/1030-aws-bill-cost-and-usage-report-filter-exclude-credits-now-showing-data.png)



Reference: [Can't see expenses for the current month in AWS Cost Explorer](https://repost.aws/questions/QU0uld0afHT5iXsN70jSVmcQ/can-t-see-expenses-for-the-current-month-in-aws-cost-explorer)


## More detailed breakdown of cost 


To get more details on the breakdown, change **Dimension** to **Usage Type**

![](/img/docs/1030-aws-bill-cost-and-usage-report-filter-dimension-to-usage-type.png)

![](/img/docs/1030-aws-bill-cost-and-usage-report-filter-dimension-to-usage-type-now-showing-detailed-breakdown.png)


:::warning[Lesson Learned]

Always make sure public IPs are released after any testing!

:::



Reference: [How to break down VPC costs?](https://repost.aws/questions/QUelBAhchWSm-9IcmSv3IybQ/how-to-break-down-vpc-costs)


## TimedStorage-ByteHrs

Based on AWS documentation:

![](/img/docs/1030-aws-bill-TimedStorage-ByteHrs.png)

Another one from Amazon docs:

> Storage Used:
>
> Amazon S3 storage pricing is summarized on the Amazon S3 pricing page.
>
> The volume of storage billed in a month is based on the average storage used throughout the month. This includes all object data and metadata stored in buckets that you created under your AWS account. We measure your storage usage in “TimedStorage-ByteHrs,” which are added up at the end of the month to generate your monthly charges.
>
> Storage Example:

> Assume you store 100 GB (107,374,182,400 bytes) of data in Amazon S3 Standard in your bucket for 15 days in March, and 100 TB (109,951,162,777,600 bytes) of data in Amazon S3 Standard for the final 16 days in March.

> At the end of March, you would have the following usage in Byte-Hours: Total Byte-Hour usage = [107,374,182,400 bytes x 15 days x (24 hours / day)] + [109,951,162,777,600 bytes x 16 days x (24 hours / day)] = 42,259,901,212,262,400 Byte-Hours. Calculate hours based on the actual number of days in a given month. For example, in our example we are using March which has 31 days or 744 hours.

> Let's convert this to GB-Months: 42,259,901,212,262,400 Byte-Hours / 1,073,741,824 bytes per GB / 744 hours per month = 52,900 GB-Months

> This usage volume crosses two different volume tiers. The monthly storage price is calculated below assuming the data is stored in the US East (Northern Virginia) Region: 50 TB Tier: 51,200 GB x $0.023 = $1,177.60 50 TB to 450 TB Tier: 1,700 GB x $0.022 = $37.40

> Total Storage cost = $1,177.60 + $37.40 = $1,215.00

Reference: 

- [Understanding your AWS billing and usage reports for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/aws-usage-report-understand.html)

- [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/#How_much_does_Amazon_S3_cost)

