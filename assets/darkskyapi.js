// DarkSky API
// CORS requests are NOT allowed by the DarkSky server
// Requests from other Servers are allowed
// So, we would make a pass thru file on a server.
// Browser sends the fetch( ) AJAX request to OUR server
// OUR server sends the AJAX request to DarkSky server
// DarkSky responds to OUR Server
// OUR Server sends the DarkSky reply back to Browser
// Browser AJAX call => Our Server => DarkSky => Our Server => Browser AJAX call

// To simulate, we will make the call with NodeJS (outside a browser)
// this way, we can avoid the CORS issue.
// It requires installing node-fetch from the terminal
//  npm install node-fetch 
// Then add a require statement at the top of our script
//
let fetch = require('node-fetch');

//let uri = 'http://jsonplaceholder.typicode.com/users';
let darksky = 'https://api.darksky.net/forecast/';
let key = '11b0a87a73edc45033c6dd08b105fe8a';
let lat = 45.3483;
let lng = -75.7584;
let uri = darksky + key + '/' + lat +','+ lng;
console.log(uri);
uri = uri.concat('?units=ca&exclude=minutely,hourly&lang=ru');
// units - ca, si, us, uk
// exclude - minutely,hourly,daily,currently
// lang - 
let options = {
    method: 'GET',
    mode: 'cors'
}
let req = new fetch.Request(uri, options);

fetch(req)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad HTTP!')
        }
    })
    .then( (j) =>{
        console.log(j.currently.temperature, j.currently.summary);
        
        console.log( j.daily.data[1] );
        //console.log('JSON data provided');
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });