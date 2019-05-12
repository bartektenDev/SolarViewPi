//Copyright and all rights all reserved to Bart Tarasewicz

function setup() {
	readConfigFile();
	dataPing();
	downloadWeatherData();
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
	Http.open("GET", "http://" + ip + "/ajax.xml");
	Http.send();
	Http.onreadystatechange = (e) => {
		//scan the data and then identify whether we see how many devices
		//are connected to the network and then display that to the User
		var allText = Http.responseText;
		alert(allText);
		//grab the ip value in the config.p file
		var firstvariable = "<devicesInNetwork>";
		var secondvariable = "</devicesInNetwork>";
		var regExString = new RegExp("(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")", "ig");
		var storeRawData = allText;
		var testRE = regExString.exec(storeRawData);

		if (testRE && testRE.length > 1) {
			var devicesConnected = testRE[1];
			document.getElementById("numOfDevices").innerHTML = devicesConnected;
		}


	}
}

function apply_settings() {
	const fs = require('fs');

	let writeStream = fs.createWriteStream('./assets/configip.p');

	var ipAdd = document.getElementById("ip_address").value;
	if (ipAdd != "") {
		writeStream.write('<ip>' + ipAdd + '</ip>', 'UTF-8');

		writeStream.on('finish', () => {
			console.log('Applied new settings successfully!');
			alert("Successfully applied new settings!");
			readConfigFile();
			dataPing();
		});
		writeStream.end();
	} else {
		alert("Please enter a valid IP address!");
	}
}

function apply_settings2() {
	const fs = require('fs');

	let writeStream = fs.createWriteStream('./assets/configzip.p');

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
}

function downloadWeatherData()	{
	var downloadLink = "https://api.darksky.net/forecast/11b0a87a73edc45033c6dd08b105fe8a/";
	var strlat = "42.3601";
	var strlong = "-71.0589";
	var fullRequestString = downloadLink + strlat + "," + strlong;
	
	parseURLParams(fullRequestString);
	var urlString = "http://www.foo.com/bar?a=a+a&b%20b=b&c=1&c=2&d#hash";
    urlParams = parseURLParams(urlString);
	alert(urlParams);
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

