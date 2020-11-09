# TODO Vedere esempi di plot javascript già fatti
# TODO bisogna cercare di capire come utilizzare questi dati, tipi di grafici, analisi annuale, mensile

# TODO Today è una giornale di tutta italia, sarebbe carino vedere se la stessa cosa che faccio su trento è possibile farlo su tutti i capoluoghi supportati, questo implica imparare javascri
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from http.cookiejar import CookieJar
from pandas.io.json import json_normalize   
import pandas as pd  
import time
import json
import re
import sys
import os


#################################################################################
#################################################################################
############################    PATH SETTINGS   #################################

# Building URL. The url is build as site_search + date_path + model_path
# In order to use the script for each city is useful adding name_city to the path
city_name = "trento"

years = ["2020"]
#,"2015","2014","2013","2012","2011"
#year = 2011
for year in years:

    # Search period settings gg.mm.yyyy
    date_from = "from/01.01.{}/".format(year)
    date_to = "to/31.12.{}/".format(year)

    date_path = date_from + date_to

    # Search model settings
    model_path = "model/articolo/"

    # Building URL. The url is build as site_search + date_path + model_path
    my_url = "https://www.{}today.it/search/{}{}".format(city_name, model_path,date_path)

    print("Page we are analysing : ", my_url)

    #################################################################################
    #################################################################################
    ############################        PARSING       ###############################

    # Opening up connection, grabbing the page
    UClient =  uReq(my_url)
    time.sleep(3)
    page_html = UClient.read()
    UClient.close()
    # html parser
    page_soup = soup(page_html,"lxml")

    print("Parsing page...")

    # Cerco il numero di pagine per ciclare su ognuna di esse
    temp = page_soup.find("div",{"class", "form-group search-input"})
    n_pages = temp.find_all("strong")[1].get_text()

    # Creo il database
    columns = ['title','subtitle',  'link', 'timestamp', 'text', 'keywords' ,'address']
    df = pd.DataFrame(columns=columns)

    #################################################################################
    #################################################################################
    ############################    STEALING ARTICLES   #############################

    print("Cicling on {} pages".format(n_pages))
    print("Getting links...")
    url_search = '{}pag/'.format(my_url)
    links = []
    # Ciclo sulle pagine e ricavo i link agli articoli
    for i in range(1,int(n_pages)+1):
        try:
            url_complete = url_search + str(i) #creo il link
            print(url_complete)

            UClient =  uReq(url_complete)
            #time.sleep(2)
            html = UClient.read()

            page_soup = soup(html,"lxml")
            stories = page_soup.find("ul",{"class","u-unstyled search-results"})
            articles = stories.findAll("li",{"class","result-item nw_result_articolo"})


            for art in articles:
                if(art.article.div.header.p.span.get_text()=="Articolo"):
                    link = 'https://www.trentotoday.it{}'.format(art.a['href'])
                    #df = df.append({'title':'', 'link':link, 'timestamp':'' ,'text':'', 'keywords':'', 'address':'', 'gps':''},ignore_index = True)
                    links.append(link)
        except:
            print('Eccezione alla pagine', i)
    print("Links obtained!")
    len_links = len(links)

    titles = []
    subtitles = []
    timestamps = []
    texts = []
    keywords = []
    addresses = []

    for link in links:
        try:
            UClient1 =  uReq(link)
            html = UClient1.read()
            page_soup = soup(html,"lxml")
            UClient1.close()
            #get title
            title = page_soup.find("h1", ("class","entry-title")).get_text().strip()
            titles.append(title)
            print(title)

            #get subtitle
            subtitle = page_soup.find("p",("class", "summary entry-summary")).get_text().strip()
            subtitles.append(subtitle)

            #get timestamp
            timestamp = page_soup.find("time", ("class", "datestamp")).get_text().strip()
            timestamps.append(timestamp)

            #get text
            p = page_soup.find("div", ("class", "entry-content-body")).findAll("p")
            text= ""
            for testo in p:
                text += testo.get_text().strip() + "\n" 
            texts.append(text)

            #get keywords
            li = page_soup.findAll("li", ("class", "tag-item"))
            parolechiave = []
            for a in li:
                parolechiave.append(a.get_text().strip())
            keywords.append(parolechiave[1:])
            #print(parolechiave[1:])

            #get address
            span_address = page_soup.findAll("span", ("class","entry-label"))
            address = []
            for span in span_address:
                #address.append(span.a.get_text().strip())
                a = span.find("a")
                if(a!= None):
                    address.append(a.get_text().strip())
                else:
                    address.append(span.get_text().splitlines()[1].strip()) #accorgimenti causati da una lettura sbagliata della stringa
            addresses.append(address[1:])
            #print(address[1:])
        except:
            print("Oops!", sys.exc_info()[0], "occurred on link, ", link)

    # Definisco il dataset
    df = pd.DataFrame(list(zip(titles, subtitles, links, timestamps,texts, keywords, addresses)), columns=columns)
    df.to_csv("{}/{}.csv".format(city_name,year),header = True)