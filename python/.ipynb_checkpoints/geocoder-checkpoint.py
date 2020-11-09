import requests
import json
import time
import geopandas
from geopy.geocoders import Nominatim
import pandas as pd
import warnings
# Per rispetto della policy bisogna impostare 1 secondo di delay tra una request e ĺ'altra

# Geocoder class
class Geocoder:
    #base url
    base_url = 'https://nominatim.openstreetmap.org/search'
    
    def fetch(self, address):
        #string query params
        params ={
            'q': address,
            'format': 'geocodejson'
        }
        res = requests.get(url = self.base_url, params = params)
        print('Status code: {}'.format(res.status_code))
        
        if(res.status_code == 200):
            return res
        else:
            return ''
    
    def parse(self, res):
        try:
            
            label = json.dumps(res['features'][0]['properties']['geocoding']['label'], indent = 2)
            coordinates = json.dumps(res['features'][0]['geometry']['coordinates'], indent = 2).replace('\n', '').replace('[', '').replace(']', '').strip().split(',')
            obj = {
                'label': label,
                'coordinates': coordinates
            }
            return obj
        except:
            pass
        
        
    
    def run(self, address):
        print(address)
        res = self.fetch(address).json()
        time.sleep(1)
        return self.parse(res)
        # Per rispetto delle norme policy
        
# main driver
if __name__ == '__main__':
        geocoder = Geocoder()
        df = pd.read_csv("./trento/2020.csv")
        df['location']= df['address'].apply(lambda x: geocoder.run(x))
        df.to_csv('2020_geocodificato.csv', index = False)