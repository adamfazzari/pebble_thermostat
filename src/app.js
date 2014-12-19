/**
 * Pebble.js for viewing status of Radio Thermostat CT30
 *
 * 
 */

var UI = require('ui');
var Vector2 = require('vector2');
var wind = new UI.Window({
  fullscreen: true,
  action: {
    up: 'up.png',
    down: '',
  }
});

var ajax = require('ajax');
var URL = 'http://192.168.0.152/tstat';

var away_temp = 64.5;


// Make a list of menu items
var mainmenu = [
  {
    title: "Thermostat",
  },
  {
    title: "Alarm",
  },
];

// Main menu
var menu = new UI.Menu({
  sections: [{
  title: "Main menu",
  items: mainmenu
  }]
});

// Main menu event handler
menu.on('select', function(event) {
  if (event.itemIndex === 0) {
    wind.show();  
  }
});

var setpoint_field = new UI.Text({
  position: new Vector2(0,20),
  size: new Vector2(144, 75),
  textAlign: 'left',
  font: 'gothic-24-bold',
  text: 'Setpoint'
});

var current_temp_field = new UI.Text({
  position: new Vector2(0,50),
  size: new Vector2(144, 75),
  textAlign: 'left',
  font: 'gothic-24-bold',
  text: 'Test'
});

var status_field = new UI.Text({
  position: new Vector2(0,80),
  size: new Vector2(144, 75),
  textAlign: 'left',
  font: 'gothic-24-bold',
  text: 'Away'
});

var rect = new UI.Rect({
  position: new Vector2(50,50),
  size: new Vector2(20,20),
  borderColor: 'white',
  backgroundColor: 'white'
});

menu.show();

ajax({url: URL, type: 'json'},
    function(json){
      //success
      console.log('Ajax success');
      
      var temp = Math.round((json.temp - 32) * (5/9));
      var setpoint = Math.round((json.t_heat - 32) * (5/9));
      
      current_temp_field.text('Current: ' + temp + 'C');
      setpoint_field.text('Setpoint: ' + setpoint + 'C');
      
      if (json.temp <= away_temp) {
        status_field.text('Away');
      } else {
        status_field.text('Home');
      } 
      
      wind.add(setpoint_field);
      wind.add(current_temp_field);
      wind.add(status_field);
    },
     
    function(error){
      //error
      console.log('Ajax failed: ' + error);
    }
);
