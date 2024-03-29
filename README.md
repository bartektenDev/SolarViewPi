# SolarViewPi
Solar panel software for raspberry pi to run Enecsys solar panel inverter data and analytics.

**Demo Images**

**Dashboard**
:-------------------------:
![](assets/dashimg.PNG)

**Preferences**
:-------------------------:
![](assets/prefimg.PNG)

**Status:** Ready! Stable version 2.0.2

**How to install**

**Step 1.** Open cmd or git console and enter the following:
```
git clone https://github.com/bartektenDev/SolarViewPi.git
(mac users use sudo before) npm install
```

**Step 2.** Now run the go into /SolarViewPi/assets/getWeatherData.py and change the latitude and longitude of coordinates of your choosing.
This will be for getting the weather data and analytics. Then open your command prompt or terminal and enter:
```
python getWeatherData.py
```
Leave this script running forever to always update the weather file in the background. And now go to /SolarViewPi/assets
/configip.p and change the IP value to the Enecsys solar panel box IP and save the file.

**Step 3.** Now in the terminal run this:
```
http-server . -p 80
```
This will start to run a local server to host the files off the raspberry pi.

**Step 4.** Lastly open your browser on your pi and enter this into your browser:
```
http://127.0.0.1
```

**Step 5.** Everything will load up and it should load all the devices connected into your dashboard. Enjoy!
