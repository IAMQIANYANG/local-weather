/*
   Created by Qian Yang on 2016-07-17.
 */

var showWeather = document.querySelector("#showWeather");

var displayLocalWeather = function() {

  showWeather.innerHTML = "<p>Retrieving...</p>";
  

  if (!navigator.geolocation) {
    showWeather.innerHTML = "<p> Sorry Geolocation is not supported by your browser.</p>";
  }

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    displayWeather(lat, lon);
  }


  function error() {
    showWeather.innerHTML = "<p>Unable to retrieve your location, please enable GPS.</p>";
  }


  navigator.geolocation.getCurrentPosition(success, error);

};




var displayWeather = function(lat, lon) {

  var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=9be25f73771dd468c4007c234b35cb20";

  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', url, true);

  weatherRequest.onload = function () {
    if (weatherRequest.status >= 200 && weatherRequest.status < 400) {
      var weatherJSON = JSON.parse(weatherRequest.responseText);
      var city = weatherJSON["name"];
      var countryCode = weatherJSON["sys"]["country"];
      var icon = '<i class="owf owf-' + weatherJSON["weather"][0]["id"] + ' owf-5x"></i>';
      var mainWeather = weatherJSON["weather"][0]["main"];
      var fahrenheit = weatherJSON["main"]["temp"] * (9/5) - 459.67;
      var celcius = (fahrenheit - 32)/1.8;

      showWeather.innerHTML = "<p>" + city + ", " + countryCode 
                              + "</p><p>" + icon
                              + "</p><p>" + mainWeather + "</p>"
                              + '<p id="fah">' + Math.round(fahrenheit) + ' °F' + '</p>'
                              + '<p id="cel" class="notShow">' + Math.round(celcius) + ' °C' + '</p>';
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
      toggleC.classList.remove("selected");
      toggleF.classList.add("selected");
      isF = !isF;
    }
  });

  toggleC.addEventListener("click", function(){
    if(isF) {
      fah.classList.add("notShow");
      cel.classList.remove("notShow");
      toggleF.classList.remove("selected");
      toggleC.classList.add("selected");
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
