//Copyright and all rights all reserved to Bart Tarasewicz

var ip = "";

function setup() {
	readConfigFile();
	dataPing();
	readWeatherData();
	grabData();
}

function readConfigFile() {
	var file = "./assets/configip.p";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				//grab the ip value in the config.p file
				var firstvariable = "<ip>";
				var secondvariable = "</ip>";
				var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
				var storeRawData = allText;
				var testRE = regExString.exec(storeRawData);

				if (testRE && testRE.length > 1) {
					var ipvar = testRE[1];
					if (document.getElementById("sharedDisplayIP")) {
						document.getElementById("sharedDisplayIP").innerHTML = ipvar;
					}
					if (document.getElementById("readIP")) {
						document.getElementById("readIP").innerHTML = ipvar;
					}
				}
			}
		}
	};
	rawFile.send(null);
}

function grabData() {
	var file = "./assets/configip.p";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				//grab the ip value in the config.p file
				var firstvariable = "<ip>";
				var secondvariable = "</ip>";
				var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
				var storeRawData = allText;
				var testRE = regExString.exec(storeRawData);

				if (testRE && testRE.length > 1) {
					var ipvar = testRE[1];
					ip = ipvar;
				}
				readData();
			}
		}
	};
	rawFile.send(null);
}

function grabData2() {
	var file = "./assets/configzip.p";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				//grab the ip value in the config.p file
				var firstvariable = "<zip>";
				var secondvariable = "</zip>";
				var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
				var storeRawData = allText;
				var testRE = regExString.exec(storeRawData);

				if (testRE && testRE.length > 1) {
					var ipvar = testRE[1];
					ip = ipvar;
				}
				readData();
			}
		}
	};
	rawFile.send(null);
}

function readData() {
	//this should be looped every second to have sorta async data, that is in quotes lmao
	
	var file = "http://" + ip + "/ajax.xml";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				
				//grab the devices connected count
				var firstvariable = "<devicesInNetwork>";
				var secondvariable = "</devicesInNetwork>";
				var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
				var storeRawData = allText;
				var testRE = regExString.exec(storeRawData);

				if (testRE && testRE.length > 1) {
					var devicesConnected = testRE[1];
					document.getElementById("numOfDevices").innerHTML = devicesConnected.fontcolor("#6863ff");
				}
			
				//grab the running since last reset
				var firstvariable2 = "<timeSinceReset>";
				var secondvariable2 = "</timeSinceReset>";
				var regExString2 = new RegExp("(?:" + firstvariable2 + ")(.*?)(?:" + secondvariable2 + ")", "ig");
				var storeRawData2 = allText;
				var testRE2 = regExString2.exec(storeRawData2);

				if (testRE2 && testRE2.length > 1) {
					var timeSinceReset = testRE2[1];
					document.getElementById("readUPTIME").innerHTML = timeSinceReset.fontcolor("#6863ff");
				}
				
				var climb;
				for(climb=0;climb<devicesConnected;climb++)	{
					//grab every device and add it to list
					var firstvariable3 = "<device"+climb.toString()+">";
					var secondvariable3 = "</device"+climb.toString()+">";
					var regExString3 = new RegExp("(?:" + firstvariable3 + ")(.*?)(?:" + secondvariable3 + ")", "ig");
					var storeRawData3 = allText;
					var testRE3 = regExString3.exec(storeRawData3);

					if (testRE3 && testRE3.length > 1) {
						var deviceName = testRE3[1];
						var startData = "dev"
						var cleanData = climb.toString();
						
						var combo1 = startData.concat(cleanData);

						var endData = "nam";
						secondData = combo1.concat(endData);
						
						document.getElementById(""+secondData.toString()).innerHTML = deviceName.fontcolor("#6863ff");;
					}
					
				}
				
			}
		}
	};
	rawFile.send(null);
}

function apply_settings() {

	
	var ipAdd = document.getElementById("ip_address").value;
	if (ipAdd != "") {
		writeFile('assets/configip.p', '<ip>' + ipAdd + '</ip>', Callback);
	} else {
		alert("Please enter a valid IP address!");
	}
}

function apply_settings2() {
	const fs = require('fs');

	let writeStream = fs.createWriteStream('./assets/configlatlong.p');

	var zipAdd = document.getElementById("zipcodebox").value;
	if (zipAdd != "") {
		writeStream.write('<zip>' + zipAdd + '</zip>', 'UTF-8');

		writeStream.on('finish', () => {
			console.log('Applied new settings successfully!');
			alert("Successfully applied new settings!");
			readConfigFile();
		});
		writeStream.end();
	} else {

	}
}

function dataPing() {
	//start checking data connection to server
	var started = new Date().getTime();
	var host = document.getElementById("sharedDisplayIP").innerHTML;
	//var port = 8080;
	var http = new XMLHttpRequest();

	document.getElementById("connectionStatusIcon").src = "assets/cloud.gif";
	document.getElementById("sharedDisplayIP").style.backgroundColor = "#efefef";

	http.open("GET", "http://" + host, /*async*/ true);
	http.onreadystatechange = function () {
		if (http.readyState == 4) {
			var ended = new Date().getTime();
			var milliseconds = ended - started;

			if (milliseconds >= 20000) {
				document.getElementById("connectionStatusIcon").src = "assets/connectionfailed2.png";
				document.getElementById("sharedDisplayIP").style.backgroundColor = "#f05d58";
			} else {
				document.getElementById("connectionStatusIcon").src = "assets/connectedicon.png";
				document.getElementById("sharedDisplayIP").style.backgroundColor = "#efefef";
			}
		} else {
			document.getElementById("connectionStatusIcon").src = "assets/connectionfailed2.png";
			document.getElementById("sharedDisplayIP").style.backgroundColor = "#f05d58";
		}
	};
	try {
		http.send(null);
	} catch (exception) {
		// this is expected
		alert('failed');
	}
}

function readWeatherData()	{
	var file = "./assets/currentweather.json";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				
				//grab the weather temp 
				var firstvariable = 'temperature":';
				var secondvariable = ',"';
				var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
				var storeRawData = allText;
				var testRE = regExString.exec(storeRawData);

				if (testRE && testRE.length > 1) {
					var temp = testRE[1];
					document.getElementById("readTEMP").innerHTML = temp;
				}
				
				//grab the weather visual idea of the weather
				var firstvariable2 = 'icon":"';
				var secondvariable2 = '","';
				var regExString2 = new RegExp("(?:" + firstvariable2 + ")(.*?)(?:" + secondvariable2 + ")", "ig");
				var storeRawData2 = allText;
				var testRE2 = regExString2.exec(storeRawData2);

				if (testRE2 && testRE2.length > 1) {
					var visual = testRE2[1];
					document.getElementById("readVISUAL").innerHTML = visual;
				}
				
				//grab the weather visibility outside
				var firstvariable3 = 'visibility":';
				var secondvariable3 = ',"';
				var regExString3 = new RegExp("(?:" + firstvariable3 + ")(.*?)(?:" + secondvariable3 + ")", "ig");
				var storeRawData3 = allText;
				var testRE3 = regExString3.exec(storeRawData3);

				if (testRE3 && testRE3.length > 1) {
					var visibility = testRE3[1];
					document.getElementById("readVISIBILITY").innerHTML = visibility;
				}
				
				//grab the weather wind speed
				var firstvariable4 = 'windSpeed":';
				var secondvariable4 = ',"';
				var regExString4 = new RegExp("(?:" + firstvariable4 + ")(.*?)(?:" + secondvariable4 + ")", "ig");
				var storeRawData4 = allText;
				var testRE4 = regExString4.exec(storeRawData4);

				if (testRE4 && testRE4.length > 1) {
					var speed = testRE4[1];
					document.getElementById("readWINDSPEED").innerHTML = speed;
				}
			}
		}
	};
	rawFile.send(null);
}

function reboot()	{
	alert("The Enecsys solar panel main box is now going to reboot. Please wait 5-10 minutes till it comes back online. SolarViewPi will automatically reconnect to the box once it's available.");
	
}
