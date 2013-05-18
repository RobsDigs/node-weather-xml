var request = require("request");
var fs = require("fs");
request("http://w1.weather.gov/xml/current_obs/KCBE.xml").pipe(fs.createWriteStream("KCBE.xml"));

