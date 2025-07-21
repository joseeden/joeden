#!/bin/bash

# Check for start and end date
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <START_MMYYYY> <END_MMYYYY>"
  echo "Example: $0 042025 062025"
  exit 1
fi

START_MMYYYY=$1
END_MMYYYY=$2

# Extract month and year 
START_MONTH=$(echo "$START_MMYYYY" | cut -c1-2)
START_YEAR_SUFFIX=$(echo "$START_MMYYYY" | cut -c3-6)
START_YEAR="${START_YEAR_SUFFIX}"

END_MONTH=$(echo "$END_MMYYYY" | cut -c1-2)
END_YEAR_SUFFIX=$(echo "$END_MMYYYY" | cut -c3-6)
END_YEAR="${END_YEAR_SUFFIX}"


# Convert months to numbers without leading zero for cal
START_MONTH_CAL=$((10#$START_MONTH))
END_MONTH_CAL=$((10#$END_MONTH))

START_DATE="${START_YEAR}-$(printf "%02d" $START_MONTH_CAL)-01T00:00:00Z"
END_DAY=$(cal $END_MONTH_CAL $END_YEAR | awk 'NF {DAYS = $NF}; END {print DAYS}')
END_DATE="${END_YEAR}-$(printf "%02d" $END_MONTH_CAL)-${END_DAY}T23:59:59Z"

echo "Start date: $START_DATE"
echo "End date: $END_DATE"

# Output Files
CSV_FILE="ec2_new_instances_${START_MMYYYY}_to_${END_MMYYYY}.csv"
XLSX_FILE="ec2_new_instances_${START_MMYYYY}_to_${END_MMYYYY}.xlsx"

echo "Generating report for EC2 instances launched between $START_DATE and $END_DATE"

# Write CSV header
echo "InstanceId,InstanceType,Region,LaunchTime" > "$CSV_FILE"

# Get AWS regions
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
