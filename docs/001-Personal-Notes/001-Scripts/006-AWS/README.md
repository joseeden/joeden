
# Notes on the Scripts 

| Script             | Usage                                | Description                                                                                                                                       |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| get_ec2_list_v1.sh | `./get_ec2_list_v1.sh`               | Get EC2 instances created from April to June 2025.                                                                                                |
| get_ec2_list_v2.sh | `./get_ec2_list_v2.sh MMYYYY MMYYYY` | Get EC2 instances created between start and end dates. |


Example: To get EC2s from Aug 2021 to Jan 2025:

```
./get_ec2_list_v2.sh 082021 012025
```


## Configure Access Keys 

You will AWS Access keys to interact with the AWS CLI.
Once you have the access keys, configure your terminal:

```bash
aws configure 
```