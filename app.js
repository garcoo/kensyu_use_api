const request = require('request');
const INDENTION = '\n';

// yamlの読み込み
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
  // call chatwork send_message-api
  request.post({
    uri: config.api.chatwork.base_url + '/rooms/' + config.api.chatwork.room_id + '/messages',
    headers: {
      'Content-type': 'application/json',
      "X-ChatWorkToken": config.api.chatwork.api_key
    },
    form: {
        'body' : makeSendMsg(data)
    }
  }, (err, res, data) => {
    console.log(data);
  });
});

// chatwork送付用のメッセージ文面作成関数
function makeSendMsg(data) {
  var weatherCmnt = ['[info][title]☀︎']
  // title
  weatherCmnt.push(data.title)
  weatherCmnt.push('☀︎[/title]')
  data.forecasts.forEach((obj, index) => {
    if(index == 0){
      // 今日の天気
      weatherCmnt.push(obj.dateLabel);
      weatherCmnt.push('の天気は');
      weatherCmnt.push(obj.telop);
      weatherCmnt.push('だよ');
      var tempe = [INDENTION];
      if(obj.temperature.min != null){
        tempe.push('最低気温は');
        tempe.push(obj.temperature.min.celsius);
        tempe.push('℃ ');
      }
      if(obj.temperature.max != null){
        tempe.push('最高気温は');
        tempe.push(obj.temperature.max.celsius);
        tempe.push('℃');
      }
      if(tempe.length > 0){
        // 気温情報が取得できた場合
        weatherCmnt = weatherCmnt.concat(tempe);
      }
      return;
    }
    // 明日以降の天気
    weatherCmnt.push(INDENTION);
    weatherCmnt.push('ちなみに');
    weatherCmnt.push(obj.dateLabel);
    weatherCmnt.push('の天気は');
    weatherCmnt.push(obj.telop);
    weatherCmnt.push('だよ');
  });
  weatherCmnt.push('[/info]');
  return weatherCmnt.join('');
}
