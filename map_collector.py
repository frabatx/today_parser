
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from pandas.io.json import json_normalize   
import pandas as pd  
import time
import json
import re


my_url = "http://www.trentotoday.it/mappa/"

# Opening up connection, grabbing the page
UClient =  uReq(my_url)
time.sleep(3)
page_html = UClient.read()

print("Leggo la pagina: ", my_url)
# html parser
page_soup = soup(page_html,"lxml")


script = page_soup.findAll("script", type = "text/javascript")[11].text     # Utilizzo lo script che mi serve (11) e lo trasformo in testo
p = re.compile("([[{].*?[}]])")                                             # Estraggo la porzione contenente il json
m = p.search(script)
print("Estraggo il json")

stocks = json.loads(m.groups()[0])                                          # Ogni stock è una riga del mio database

df = json_normalize(stocks)                                                 # Converto il json in un dataframe
#df.to_csv("data.csv",header = True)
print("Converto il json nel mio dataframe")
# Ho creato un file con i dati risalenti al giorno 24/02. Il dataset contiene al massimo 333 link, 
# ogni giorno si aggiungono link e quelli più vecchi vengono cancellati. Quello che devo fare è aggiornare 
# il file che mi sono creato con le nuove notizie, aggiungendo ogni giorno quello che viene scritto sul sito. 
# Per fare questo devo controllare il sito, ricavare le notizie e aggiungere quelle nuove.

stored = pd.read_csv("data.csv")
updated_df = pd.concat([stored,df],sort=True, ignore_index=True).drop_duplicates(['title', 'link'])
updated_df = updated_df[['title','link','address','gps']]
updated_df.to_csv("data.csv",header = True)

#########################################
######### Manipolazione Link ############
#########################################

links = updated_df['link'].tolist()
# Aggiungo le keywords per capire di cosa parla il testo. Sono obbligatorie per un sito ed è il modo in cui loro classificano le notizie.
#  Viene fatto dall'autore obbligatoriamente. Inoltre prendo il timestamp e il testo dell'articolo

# Creo altre colonne al database
updated_df['keywords'] = ''
updated_df['timestamp'] = ''
updated_df['text'] = ''

#Da un link prendo keywords, timestamp, testo
for index, row in updated_df.iterrows():
    try:
        print("Sto rubando da: ", row['link'])
        client =  uReq(row['link'])
        page = client.read()
        page_sp = soup(page,"lxml")

        keywords=''
        time_stamp = ''
        text = ''

        keywords = page_sp.find("meta", {"name": "keywords"})['content']        # Prendo le keyboards 

        time_stamp = page_sp.find("time", {"class","datestamp"}).get_text()     # Prendo il time stamp

        texts = page_sp.find("div", {"class","entry-content-body"})             # Prendo il testo
        text = []
        for p in texts.findAll("p"):
            text.append(p.get_text())
        text = ''.join(text)

        updated_df.iloc[index]['keywords'] = keywords
        updated_df.iloc[index]['timestamp'] = time_stamp
        updated_df.iloc[index]['text'] = text
    except:
        print("OMG c'è stato un errore alla riga: ", index)

# TODO ordinare per timestamp per avere le prime notizie in alto
print("Aggiorno il dataset")
updated_df.to_csv("data1.csv",header = True)



