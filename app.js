var fs = require('fs'),
props = require('props');
var yamlData = fs.readFileSync('config/application-develop.yml','utf8');
var config = props(yamlData);
console.log( config.api );
