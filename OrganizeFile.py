# GOAL: read thru the csv file, pick out the most commmon companies
# create a hash table that has each company as the keyword and an array of prices
import pandas

file = ''
df = None

def initializefile(f):
    global file
    file = f

def organizeFile():
    global df
    df = pandas.read_csv(file) # df is the DataFrame
    df = df.sort_values(by=["Company Name"]) 


# initialize file and read into df
initializefile('datafile.csv')
organizeFile()

print(df)

newfile = "outputfile.csv"
df.to_csv(newfile, index=False)
    