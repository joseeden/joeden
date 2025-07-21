#!/bin/bash


# Output Files
CSV_FILE="ec2_new_instances_apr_jun.csv"
XLSX_FILE="ec2_new_instances_apr_jun.xlsx"

# Filter for months (in ISO 8601 format)
START_DATE="2025-04-01T00:00:00Z"
END_DATE="2025-06-30T23:59:59Z"

echo "InstanceId,InstanceType,Region,LaunchTime" > "$CSV_FILE"

# Get all AWS regions
REGIONS=$(aws ec2 describe-regions --query "Regions[].RegionName" --output text)

for REGION in $REGIONS; do
  echo "Checking region: $REGION"

  aws ec2 describe-instances \
    --region "$REGION" \
    --query "Reservations[].Instances[?LaunchTime>=\`$START_DATE\` && LaunchTime<=\`$END_DATE\`].[InstanceId,InstanceType,LaunchTime]" \
    --output text |
  while read -r INSTANCE_ID INSTANCE_TYPE LAUNCH_TIME; do
    echo "$INSTANCE_ID,$INSTANCE_TYPE,$REGION,$LAUNCH_TIME" >> "$CSV_FILE"
  done
done

echo "CSV report generated: $CSV_FILE"


# Convert CSV to Excel using embedded Python
python3 - <<EOF
import pandas as pd

csv_file = "$CSV_FILE"
xlsx_file = "$XLSX_FILE"

df = pd.read_csv(csv_file)
df.to_excel(xlsx_file, index=False)

print(f"Excel file generated: {xlsx_file}")
EOF