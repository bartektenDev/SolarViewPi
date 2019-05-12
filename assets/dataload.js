//Copyright and all rights all reserved to Bart Tarasewicz

function setup() {
	readConfigFile();
	dataPing();
	readWeatherData()
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

function startUptime()	{
	var counter = 0;//set this to what ever you want the start # to be
	countUP ();//call the function once	
	function countUP () {
		counter++;//increment the counter by 1
		setTimeout ( "countUP()", 1000 );//runs itsself after 1000 miliseconds
		//console.log(counter);uncomment to can see it in action, only with firebug
	}
}

var counter = 0;//set this to what ever you want the start # to be
	countUP ();//call the function once	
	function countUP () {
		counter++;//increment the counter by 1
		setTimeout ( "countUP()", 1000 );//runs itsself after 1000 miliseconds
		//console.log(counter);uncomment to can see it in action, only with firebug
	}
