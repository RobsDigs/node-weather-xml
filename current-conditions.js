var  lineReader = require('line-reader');
var weatherData = {};
var i = 0;

lineReader.eachLine('KCBE.xml', function (line, last) {
	i = i + 1;
	//console.log(i);
	if(i >= 16) {
		lt1 = line.indexOf("<");
		gt1 = line.indexOf(">");
		lt2 = line.lastIndexOf("<");
		gt2 = line.lastIndexOf(">");
		lt1 = lt1 + 1;
		key = line.substring(lt1, gt1);
		gt1 = gt1 + 1;
		value = line.substring(gt1, lt2);
		weatherData[key] = value;
	}
	if(last) {
		//console.log(last);
		delete weatherData[key];
		key = "";
		for(key in weatherData) {
			show = "Key: " + key + " Value: " + weatherData[key];
			console.log(show);
		}
	}
});
