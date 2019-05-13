import urllib2
import os
import sys
import time
import subprocess as sp
#Copyright and all rights all reserved to Bart Tarasewicz

def cleanSlate():
    print('checking data...')
    exists = os.path.isfile('./currentweather.json')
    if exists:
        print('cleaning data...')
        os.remove("currentweather.json")
        getWeather()
    else:
        print('no cache found...')
        getWeather()

def getWeather():
    latitude = "41.9747306"
    longitude = ",-88.0698165"
    fullRequestString = "https://api.darksky.net/forecast/11b0a87a73edc45033c6dd08b105fe8a/%s%s" % (latitude,longitude)
    response = urllib2.urlopen(fullRequestString)
    html = response.read()
    print('reading data...')
    print(html)
    print('successfully read data!')
    f=open("currentweather.json", "a+")
    f.write(html)
    f.close()
    timeOut();

def timeOut():
    #every 20 minutes get new weather data in seconds
    print('Starting timer in 5 seconds..')
    time.sleep(5)
    print('Waiting 20 minutes till next data grab')
    for i in xrange(15,0,-1):
        sys.stdout.write('Waiting ' +str(i)+' seconds till next weather grab')
        sys.stdout.flush()
        time.sleep(1)
        sp.call('cls',shell=True)
    print('Timer finished! Getting more data again.')
    cleanSlate()

cleanSlate()
