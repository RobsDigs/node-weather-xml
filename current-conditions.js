var  lineReader = require('line-reader');
var http = require('http');
var weatherData = {};
var i = 0;
body = "Cumberland Area Weather Conditions";

function loadBody() {
	lineReader.eachLine('KCBE.xml', function (line, last) {
		i = i + 1;
		if(i >= 16) {
			lt1 = line.indexOf("<");
			gt1 = line.indexOf(">");
			lt2 = line.lastIndexOf("<");
			lt1 = lt1 + 1;
			key = line.substring(lt1, gt1);
			gt1 = gt1 + 1;
			value = line.substring(gt1, lt2);
			weatherData[key] = value;
		}
		if(last) {
			delete weatherData[key];
			//for(key in weatherData) {
				//show = "Key: " + key + " Value: " + weatherData[key];
			//}
			body = '<html>'+
    			'<head>'+
    			'<meta http-equiv="Content-Type" '+
    			'content="text/html; charset=UTF-8" />'+
    			'</head>'+
    			'<body link=\"#000000\" vlink=\"#000000\">'+
				'<b>' + weatherData["location"] + '</b><br />' +
				'<i>' + weatherData["observation_time"] + '</i><br /><br />' +
				'<table align=\"left\" valign=\"top\" width=\"95%\" border=\"0\"><tr><td width=\"30%\"><img src=\"' + weatherData["icon_url_base"] + weatherData["icon_url_name"] + '\" alt=\"Weather Icon\" width=\"56\" height=\"56\"></td><td width=\"70%\" align=\"center\"><h3>' + weatherData["temperature_string"] + '</h3><a href=\"http://radar.weather.gov/ridge/Conus/northeast_loop.php\" target=\"_blank\">Radar Loop</a></td></tr></table>' + 
				weatherData["weather"] + '<br /><br />Winds: ' + weatherData["wind_string"] +
    			'</body>'+
    			'</html>';
		}
	});
}

loadBody();

function onRequest(request, response) {
	loadBody();
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
	response.end();
}
http.createServer(onRequest).listen(8080);

