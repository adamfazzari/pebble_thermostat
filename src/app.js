/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

//splash screen
var splashCard = new UI.Card({
  title: "Connecting...",
  body: "Please wait"
});

splashCard.show();

var ajax = require('ajax');

var URL = 'http://192.168.0.152/tstat';

ajax({url: URL, type: 'json'},
    function(json){
      //success
      console.log('Ajax success');
      
      var temp = Math.round(json.temp);
      
      var resultsCard = new UI.Card({
        title: 'Current Temp',
        body: '' + temp
      });
      
      resultsCard.show();
    },
    function(error){
      //error
      console.log('Ajax failed: ' + error);
    }
);
