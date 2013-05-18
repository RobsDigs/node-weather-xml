This is a rough beginning on a node.js script that will display
current weather conditions for a given National Weather Service
station.  It is setup to get the conditions for Cumberland, Md.
at the moment but you can change that line to use a station near
you.

xml-download.js downloads the xml file from the NOAA website. They 
would rather you only make a call on their server every hour so this 
could be setup to run from cron rather then every time the data is 
displayed.

current-conditions.js will eventually display a webpage using the data
read from the xml file. Right now all it does is read and parse the xml
file and loads it into an associative array.
