# count_langs_v1.py
import pandas as pd

df = pd.read_csv('tweets.csv')
langs_count = {}

col = df['lang']

for entry in col:
    if entry in langs_count:
        langs_count[entry] += 1
    else:
        langs_count[entry] = 1

print(langs_count)