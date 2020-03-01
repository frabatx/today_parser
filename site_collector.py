from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from pandas.io.json import json_normalize   
import pandas as pd  
import time
import json
import re

my_url = "http://www.trentotoday.it/search/from/01.01.2010/to/27.02.2020/model/articolo"

# Opening up connection, grabbing the page
UClient =  uReq(my_url)
time.sleep(3)
page_html = UClient.read()

# html parser
page_soup = soup(page_html,"lxml")
#stories = page_soup.find("ul",{"class","u-unstyled search-results"})
#articles = stories.findAll("li",{"class","result-item nw_result_articolo"})

# Cerco il numero di pagine per ciclare su ognuna di esse
temp = page_soup.find("div",{"class", "form-group search-input"})
n_pages = temp.find_all("strong")[1].get_text()

# Creo il database
columns = ['title', 'link', 'timestamp', 'text', 'keywords' ,'address', 'gps']
df = pd.DataFrame(columns=columns)

url_search = 'http://www.trentotoday.it/search/model/articolo/from/01.01.2010/to/27.02.2020/pag/'

# Per ogni pagina mi prendo le informazioni
for i in range(1,int(n_pages)):
    try:
        url_complete = url_search + str(i) #creo il link
        UClient =  uReq(url_complete)
        time.sleep(2)
        html = UClient.read()

        page_soup = soup(html,"lxml")
        stories = page_soup.find("ul",{"class","u-unstyled search-results"})
        articles = stories.findAll("li",{"class","result-item nw_result_articolo"})

        for art in articles:
            if(art.article.div.header.p.span.get_text()=="Articolo"):
                title = art.a.get_text()
                link = 'http://www.trentotoday.it{}'.format(art.a['href'])
                timestamp = art.i.get_text()
                #print(title[20:-18], link, timestamp)
                df = df.append({'title':title[20:-18], 'link':link, 'timestamp':timestamp ,'text':'', 'keywords':'', 'address':'', 'gps':''},ignore_index = True)
    except:
        print('Eccezione alla pagine', i)
                
df.to_csv("sites_data.csv",header = True)



# TODO la ricerca è da fare per ogni anno, si cambia il link e si fa una ricerca dal primo dell'anno fino all'ultimo. 
# TODO bisogna completare il dataset con le informazioni mancanti (prendere codice da map_collector_DATA MANIPULATION)
# TODO Vedere esempi di plot javascript già fatti
# TODO bisogna cercare di capire come utilizzare questi dati, tipi di grafici, analisi annuale, mensile

# TODO Today è una giornale di tutta italia, sarebbe carino vedere se la stessa cosa che faccio su trento è possibile farlo su tutti i capoluoghi supportati, questo implica imparare javascript

