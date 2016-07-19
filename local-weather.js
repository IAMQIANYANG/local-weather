/*
   Created by Qian Yang on 2016-07-17.
 */

// var result = document.querySelector("#showWeather");
//
// var displayLocalWeather = function() {
//
//   if (!navigator.geolocation) {
//     result.innerHTML = "<p> Sorry Geolocation is not supported by your browser.</p>";
//   }
//
//   function success(position) {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
//
//     showWeather(lat, lon);
//   }
//
//
//   function error() {
//     result.innerHTML = "<p>Unable to retrieve your location, please enable GPS.</p>";
//   }
//
//   result.innerHTML = "Retrieving...";
//
//   navigator.geolocation.getCurrentPosition(success, error);
//
// };
//
//
// var showWeather = function(lat, lon) {
//   var showWeather = document.querySelector("#showWeather");
//
//   var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=9be25f73771dd468c4007c234b35cb20";
//
//   var weatherRequest = new XMLHttpRequest();
//   weatherRequest.open('GET', url, true);
//
//   weatherRequest.onload = function () {
//     if (weatherRequest.status >= 200 && weatherRequest.status < 400) {
//       var weatherJSON = JSON.parse(weatherRequest.responseText);
//       var icon = '<i class="owf owf-' + weatherJSON["weather"][0]["id"] + ' owf-5x"></i>';
//       var mainWeather = weatherJSON["weather"][0]["main"];
//       var fahrenheit = weatherJSON["main"]["temp"] * (9/5) - 459.67;
//       var celcius = (fahrenheit - 32)/1.8;
//
//       showWeather.innerHTML = "<p>" + icon
//         + "</p><p>" + mainWeather + "</p>"
//         + '<p id="fah">' + Math.round(fahrenheit) + ' °F' + '</p></p>'
//         + '<p id="cel" class="notShow">' + Math.round(celcius) + ' °C' + '</p></p>';
//       tempToggle();
//     }
//   };
//
//   weatherRequest.onerror = function () {
//     showWeather.innerHTML = "<p>Sorry we were unable to reach the weather server..</p>"
//   };
//
//   weatherRequest.send();
//
// };


var displayLocalWeather = function() {
  var showLocation = document.querySelector("#showLocation");

  var locactionRequest = new XMLHttpRequest();
  locactionRequest.open('GET', 'http://ipinfo.io/json', true);

  locactionRequest.onload = function () {
    if (locactionRequest.status >= 200 && locactionRequest.status < 400) {
      var locationJSON = JSON.parse(locactionRequest.responseText);
      var city = locationJSON["city"];
      var country = locationJSON["country"];
      var cor = locationJSON["loc"].split(',');
      var lat = cor[0];
      var lon = cor[1];

      showWeather(lat, lon);

      showLocation.innerHTML = "<p>" + city + ", " + country + "</p>"

    }
  };
  locactionRequest.onerror = function () {
    showLocation.innerHTML = "Sorry we were unable to get your location..."
  };

  locactionRequest.send();
};




var showWeather = function(lat, lon) {
  var showWeather = document.querySelector("#showWeather");

  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=9be25f73771dd468c4007c234b35cb20";

  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', url, true);

  weatherRequest.onload = function () {
    if (weatherRequest.status >= 200 && weatherRequest.status < 400) {
      var weatherJSON = JSON.parse(weatherRequest.responseText);
      var icon = '<i class="owf owf-' + weatherJSON["weather"][0]["id"] + ' owf-5x"></i>';
      var mainWeather = weatherJSON["weather"][0]["main"];
      var fahrenheit = weatherJSON["main"]["temp"] * (9/5) - 459.67;
      var celcius = (fahrenheit - 32)/1.8;

      showWeather.innerHTML = "<p>" + icon
                              + "</p><p>" + mainWeather + "</p>"
                              + '<p id="fah">' + Math.round(fahrenheit) + ' °F' + '</p></p>'
                              + '<p id="cel" class="notShow">' + Math.round(celcius) + ' °C' + '</p></p>';
      tempToggle();
    }
  };

  weatherRequest.onerror = function () {
    showWeather.innerHTML = "<p>Sorry we were unable to reach the weather server..</p>"
  };

  weatherRequest.send();

};


var tempToggle = function(){
  var toggleF = document.querySelector("#fahrenheit");
  var toggleC = document.querySelector("#celcius");
  var fah = document.querySelector("#fah");
  var cel = document.querySelector("#cel");
  var isF = true;
  toggleF.addEventListener("click", function(){
    if(!isF) {
      cel.classList.add("notShow");
      fah.classList.remove("notShow");
      isF = !isF;
    }
  });

  toggleC.addEventListener("click", function(){
    if(isF) {
      fah.classList.add("notShow");
      cel.classList.remove("notShow");
      isF = !isF;
    }
  })
  
};


var ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

ready(displayLocalWeather());
