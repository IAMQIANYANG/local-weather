/*
   Created by Qian Yang on 2016-07-17.
 */

var result = document.querySelector("#showWeather");

var displayLocalWeather = function() {

  if (!navigator.geolocation) {
    result.innerHTML = "<p> Sorry Geolocation is not supported by your browser.</p>";
  }

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    showAPI(lat, lon);
  }


  function error() {
    result.innerHTML = "<p>Unable to retrieve your location, please enable GPS.</p>";
  }

  result.innerHTML = "Retrieving...";

  navigator.geolocation.getCurrentPosition(success, error);

};


var showAPI = function(lat, lon) {

  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=9be25f73771dd468c4007c234b35cb20";

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var weatherJSON = JSON.parse(request.responseText);
      var city = weatherJSON["name"];
      var countryCode = weatherJSON["sys"]["country"];
      var fahrenheit = weatherJSON["main"]["temp"] * (9/5) - 459.67;
      var mainWeather = weatherJSON["weather"][0]["main"];
      var icon = '<i class="owf owf-' + weatherJSON["weather"][0]["id"] + ' owf-5x"></i>';

      result.innerHTML = "<p>" + city + ", " + countryCode + "</p><p>" + mainWeather + "</p><p>" + icon + "<p id='currentTemp'>" + Math.round(fahrenheit) + " °F" + "</p></p>";
      tempConvert(fahrenheit);

    } else {
      result.innerHTML = "<p> Sorry it seems that there is something wrong with the server.</p>";

    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
  };

  request.send();

};


var tempConvert = function(fahrenheit){
  var toF = document.querySelector("#fahrenheit");
  var toC = document.querySelector("#celcius");
  var tempDisplay = document.querySelector("#currentTemp");
  var temp = fahrenheit;
  var isFah = true;
  toC.addEventListener("click", function(){
    if (isFah) {
      temp = (temp - 32)/1.8;
      tempDisplay.textContent = Math.round(temp) + " °C";
      isFah = !isFah;
    }
  });
  toF.addEventListener("click", function(){
    if (!isFah) {
      temp = temp * 1.8 + 32;
      tempDisplay.textContent = Math.round(temp) + " °F";
      isFah = !isFah;
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