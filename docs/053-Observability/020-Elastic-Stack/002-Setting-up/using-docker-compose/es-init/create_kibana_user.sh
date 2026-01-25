#!/bin/bash
# Run this after Elasticsearch is up with security enabled

ELASTIC_PASSWORD=changeme   # The password for the elastic superuser

# Create a Kibana user
curl -u elastic:$ELASTIC_PASSWORD -X POST "http://localhost:9200/_security/user/kibana_system" -H "Content-Type: application/json" -d '{
  "password" : "kibanapassword123",
  "roles" : [ "kibana_system" ],
  "full_name" : "Kibana System User"
}'

# Create a Logstash user
curl -u elastic:$ELASTIC_PASSWORD -X POST "http://localhost:9200/_security/user/logstash_system" -H "Content-Type: application/json" -d '{
  "password" : "logstash_password123",
  "roles" : [ "logstash_system" ],
  "full_name" : "Logstash System User"
}'
