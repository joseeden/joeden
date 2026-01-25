---
title: "Twitter Input Plugin"
description: "Twitter Input Plugin"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Logstash
sidebar_position: 3
last_update:
  date: 9/10/2023
---


## Overview

The Twitter Input Plugin in Logstash allows you to pull data from Twitter streams in real-time. It facilitates the collection of tweets based on specified search criteria, making it ideal for real-time data processing.

- It connects to the Twitter API to retrieve tweets matching a set of filters.
- Useful for monitoring trends, sentiment analysis, or any real-time Twitter data processing.

This lab focuses on testing input plugins in Logstash and integrating them with Elasticsearch for log processing and data visualization.

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
 
- The Logstash node can reach Elasticsearch node via port 9200 
- The Logstash node needs to have internet access for this lab.

## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/053-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Share Elasticsearch CA cert to Logstash](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on both nodes](https://www.scaler.com/topics/linux-jq/)


## Twitter API Keys and Tokens

To test the Twitter plugin in Logstash, you need the API keys and tokens from Twitter. Follow the steps below to generate them.

1. Go to [developer.x.com/en/apps](https://developer.x.com/en/apps) and sign in with your Twitter account.

    :::info 

    Twitter changed to "X" in mid-2023.

    :::

2. Click **Create an App**. If this is your first time, you may need to apply for a Twitter developer account. Click **Apply** > **Sign up for Free Account**

    ![](/img/docs/01052025-twitter-dev-portal.png)


    For more information, please see [Frequently asked questions about developer accounts and access.](https://developer.x.com/en/support/x-api/developer-account1)

3. Fill in your use cases and then click **Submit**.

    ![](/img/docs/01052025-twitter-dev-portal-2.png) 

4. After the app is created, go to your dashboard and click the app > Edit. Set the name and click Save.

    ![](/img/docs/01052025-twitter-dev-portal-3.png) 

5. Under the **Keys and tokens** tab, click **Regenerate** > **Yes, regenerate**.
    
    ![](/img/docs/01052025-twitter-dev-portal-4.png) 

6. Copy the API Key and Secret, and store them securely. Click **Yes, I saved them**.

    ![](/img/docs/01052025-twitter-dev-portal-5.png) 

7. Click **Generate** for the Access Tokens and Secret under **Authentication Tokens.**

    ![](/img/docs/01052025-twitter-dev-portal-6.png) 

8. Copy the Access Token and Secret and store them securely.


## Using the Plugin 

Consider the sample `plugin-twitter.conf` below. 

Set the API keys, Access token, Elasticsearch IP, and credentials. You can also set the keywords to search for.

```json
input {
  twitter {
      consumer_key => "REPLACE THIS WITH YOUR API KEY"
      consumer_secret => "REPLACE THIS WITH YOUR API KEY SECRET"
      oauth_token => "REPLACE THIS WITH YOUR ACCESS TOKEN"
      oauth_token_secret => "REPLACE THIS WITH YOUR ACCESS TOKEN SECRET"
      keywords => ["money","bank"]
      full_tweet => true
  }
}

output {
    elasticsearch {
      hosts => ["$ELASTIC_ENDPOINT:9200"]    ## address of elasticsearch node
      index => "twiter"
      user => "elastic"
      password => "enter-password-here"
      ssl => true
      ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"      ## Shared Elasticsearch CA certificate path
    }
 stdout {
  codec => "rubydebug"
  }
} 
```

Run the configuration using Logstash:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/plugin-twitter.conf
```

:::info 

If you encounter the error below, it means that your account may have limited access. Please see [Error: NotFound](#error-notfound)

```bash
[WARN ] 2025-01-04 19:45:02.972 [[main]<twitter] twitter - Twitter client error {:message=>"", :exception=>Twitter::Error::NotFound, 
```

:::


First, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

To verify the indexed data in Elasticsearch:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

Query Elasticsearch to retrieve the data:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/twitter/_search?pretty=true -d'
{
  "size": 1
}' | jq
```


## `Error: NotFound` 

Problem: Unable to test the API because I kept getting the error message below. Tried using the `keyword` and `follows` in the Logstash pipelin fil, but both yielded the same error message.

```bash
[WARN ] 2025-01-04 19:45:02.972 [[main]<twitter] twitter - Twitter client error {:message=>"", :exception=>Twitter::Error::NotFound, :backtrace=>["/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/twitter-6.2.0/lib/twitter/streaming/response.rb:24:in on_headers_complete'", "org/ruby_http_parser/RubyHttpParser.java:370:in <<'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/twitter-6.2.0/lib/twitter/streaming/response.rb:19:in <<'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/twitter-6.2.0/lib/twitter/streaming/connection.rb:20:in stream'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/twitter-6.2.0/lib/twitter/streaming/client.rb:119:in request'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/twitter-6.2.0/lib/twitter/streaming/client.rb:38:in filter'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/logstash-input-twitter-4.1.1/lib/logstash/inputs/twitter.rb:166:in do_run'", "/usr/share/logstash/vendor/bundle/jruby/3.1.0/gems/logstash-input-twitter-4.1.1/lib/logstash/inputs/twitter.rb:146:in run'", "/usr/share/logstash/logstash-core/lib/logstash/java_pipeline.rb:420:in inputworker'", "/usr/share/logstash/logstash-core/lib/logstash/java_pipeline.rb:411:in block in start_input'"], :options=>nil}
```

It appears the issue might be related to API version or limited permissions. You might need to get a paid tier to access the other API endpoints. As such, I did not continue this lab anymore. For reference, please see the links below:

- [Logstash Twitter plugin `Error::Forbidden`](https://stackoverflow.com/questions/70749420/logstash-twitter-plugin-errorforbidden)
- [Twitter api in laravel with abraham/twitteroauth package](https://stackoverflow.com/questions/79311794/twitter-api-in-laravel-with-abraham-twitteroauth-package)
- [Logstash Twitter plugin `Error::Forbidden`](https://devcommunity.x.com/t/connect-logstash-to-twitter-app-v2/172503/12)


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```