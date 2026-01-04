# count_langs_v2.py
import pandas as pd

df = pd.read_csv('tweets.csv')
langs_count = {}

col = df['lang']

def count_entries(df, col_name):
    langs_count = {}
    col = df[col_name]

    for entry in col:
        if entry in langs_count:
            langs_count[entry] += 1
        else:
            langs_count[entry] = 1

    return langs_count

result = count_entries(df, 'lang')
print(result)