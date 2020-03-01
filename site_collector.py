from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from pandas.io.json import json_normalize   
import pandas as pd  
import time
import json
import re

#################################################################################
#################################################################################
############################    PATH SETTINGS   #################################

# Building URL. The url is build as site_search + date_path + model_path
# In order to use the script for each city is useful adding name_city to the path
city_name = "trento"

years = ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]

for year in years:
    # Search period settings gg.mm.yyyy
    date_from = "from/01.01.{}/".format(year)
    date_to = "to/31.12.{}/".format(year)

    date_path = date_from + date_to

    # Search model settings
    model_path = "model/articolo/"

    # Building URL. The url is build as site_search + date_path + model_path
    my_url = "http://www.{}today.it/search/{}{}".format(city_name, model_path,date_path)

    print("Internet site : ", my_url)

    #################################################################################
    #################################################################################
    ############################        PARSING       ###############################

    # Opening up connection, grabbing the page
    UClient =  uReq(my_url)
    time.sleep(3)
    page_html = UClient.read()

    # html parser
    page_soup = soup(page_html,"lxml")

    print("Parsing page...")

    # Cerco il numero di pagine per ciclare su ognuna di esse
    temp = page_soup.find("div",{"class", "form-group search-input"})
    n_pages = temp.find_all("strong")[1].get_text()

    # Creo il database
    columns = ['title', 'link', 'timestamp', 'text', 'keywords' ,'address', 'gps']
    df = pd.DataFrame(columns=columns)

    #################################################################################
    #################################################################################
    ############################    STEALING ARTICLES   #############################

    print("Cicling on {} pages".format(n_pages))

    url_search = '{}pag/'.format(my_url)

    # Per ogni pagina mi prendo le informazioni
    for i in range(1,int(n_pages)+1):
        try:
            url_complete = url_search + str(i) #creo il link
            print(url_complete)

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
        
                    
    df.to_csv("{}_data.csv".format(year),header = True)



# TODO bisogna completare il dataset con le informazioni mancanti (prendere codice da map_collector_DATA MANIPULATION)
# TODO Vedere esempi di plot javascript già fatti
# TODO bisogna cercare di capire come utilizzare questi dati, tipi di grafici, analisi annuale, mensile

# TODO Today è una giornale di tutta italia, sarebbe carino vedere se la stessa cosa che faccio su trento è possibile farlo su tutti i capoluoghi supportati, questo implica imparare javascript

