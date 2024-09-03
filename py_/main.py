import pandas as pd
import os
from rapidfuzz import fuzz, process

croma = r"C:\Users\axels\Desktop\WebScrapper\pages\croma\croma_.csv"
reliance = r"C:\Users\axels\Desktop\WebScrapper\pages\croma\croma_.csv"
# print(csv_file)
df = pd.read_csv(croma)
# print(df['product-name'])

unique_name = []

for each in df['product-name']:
    name = each.split()[:5]
    name = ' '.join(name)
    unique_name.append(name)
unique_name = list(set(unique_name))

# print(unique_name)
# print(type(unique_name))

croma_df = pd.read_csv(croma)
reliance_df = pd.read_csv(reliance)

croma_names = croma_df['product-name']
reliance_names = reliance_df['product-name']

# print(croma_names)
# print(reliance_names)

threshold = 100
out_file = r"C:\Users\axels\Desktop\WebScrapper\pages\croma\out-put.csv"

def find_matches_df(unique_name, croma_names, reliance_names, threshold):
    data = []

    for each in unique_name:
        croma_matches = [name for name in croma_names if fuzz.partial_ratio(each, name) >= threshold]
        reliance_matches = [name for name in reliance_names if fuzz.partial_ratio(each, name) >= threshold]
        
        if not croma_matches:
            croma_matches = [None]
        if not reliance_matches:
            reliance_matches = [None]

        # Combine all matches with unique_name, croma_name, and reliance_name
        for croma_name in croma_matches:
            for reliance_name in reliance_matches:
                data.append({
                    'unique_name': each,
                    'croma_name': croma_name,
                    'reliance_name': reliance_name
                })

    # Convert the data into a DataFrame
    df = pd.DataFrame(data, columns=['unique_name', 'croma_name', 'reliance_name'])
    return df

# Example usage
df_matches = find_matches_df(unique_name, croma_names, reliance_names, threshold)
print(df_matches)

df_matches.to_csv(out_file, sep=',', encoding='utf-8')
print("Done")
