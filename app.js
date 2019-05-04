const request = require('request');

var fs = require('fs'),
props = require('props');
var yamlData = fs.readFileSync('config/application-develop.yml','utf8');
var config = props(yamlData);

// call livedoor weather-api
request.get({
    uri: config.api.livedoor.base_url,
    headers: {'Content-type': 'application/json'},
    qs: {
        output: "json",
        city: config.api.livedoor.city
    },
    json: true
}, function(err, req, data){
    let result = {};
    data.forecasts.forEach((obj) => {
      console.log(obj.dateLabel);
      console.log(obj.telop);
    });
});
