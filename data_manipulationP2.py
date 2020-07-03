!pip install geopandas
!pip install geopy
import geopandas
import pandas as pd
import geopy
from geopy.extra.rate_limiter import RateLimiter
import time

def timer(start,end):
  hours, rem = divmod(end-start, 3600)
  minutes, seconds = divmod(rem, 60)
  return "{:0>2}:{:0>2}:{:05.2f}".format(int(hours),int(minutes),seconds)

years = ["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011"]
#"2019","2018","2017","2016","2015","2014","2013","2012",
for year in years:
  start = time.time()
  print("Sto processando l'anno {}".format(year))
  df = pd.read_csv("/content/trento_data/{}.csv".format(year))
  addresses = df['address'].to_list()
  for i in range(0,len(addresses)) : 
      addresses[i] = addresses[i][2:-2].replace('\', \'', ',')
      addresses[i] = addresses[i].replace('\', \"', ',')    
      addresses[i] = addresses[i].replace('Centro storico','Trento')

  df["address"] = addresses
  try:
    locator = geopy.geocoders.Nominatim(user_agent="today_parser")
    # 1 - conveneint function to delay between geocoding calls
    start1 = time.time()
    geocode = RateLimiter(locator.geocode, min_delay_seconds=1)
    end1 = time.time()
    print("1 - conveneint function to delay between geocoding calls. Execution time: {}".format(timer(start1, end1)))
    # 2- - create location column
    start2 = time.time()
    df['location'] = df['address'].apply(geocode)
    end2 = time.time()
    print("2- - create location column. Execution time: {}".format(timer(start2, end2)))
    # 3 - create longitude, laatitude and altitude from location column (returns tuple)
    start3 = time.time()
    df['point'] = df['location'].apply(lambda loc: tuple(loc.point) if loc else (0.0,0.0,0.0))
    end3 = time.time()
    print("3 - create longitude, laatitude and altitude from location column (returns tuple). Execution time: {}".format(timer(start3, end3)))
    # 4 - split point column into latitude, longitude and altitude columns
    start4 = time.time()
    df[['latitude', 'longitude', 'altitude']] = pd.DataFrame(df['point'].tolist(), index=df.index)
    end4 = time.time()
    print("4 - split point column into latitude, longitude and altitude columns. Execution time: {}".format(timer(start4, end4)))
  except ValueError:
    print("Qualcosa é andato storto!")
  finally:
    df.to_csv("/content/trento_data/trento_{}.csv".format(year),header = True)
    end = time.time()
    print("Tempo di esecuzione totale: {}".format(timer(start, end)))
