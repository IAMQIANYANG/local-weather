/*
   Created by Qian Yang on 2016-07-17.
 */
//
window.onload = function getLocation() {
  var result = document.querySelector("#showWeather");

  result.innerHTML = "2";

  if (!navigator.geolocation) {
    result.innerHTML = "<p> Sorry Geolocation is not supported by your browser.</p>";
  }

  function success(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=9be25f73771dd468c4007c234b35cb20";

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var weatherJSON = JSON.parse(request.responseText);
        var city = weatherJSON["name"];
        var countryCode = weatherJSON["sys"]["country"];
        var fahrenheit = weatherJSON["main"]["temp"];
        var mainWeather = weatherJSON["weather"][0]["main"];
        var icon = '<i class="owf owf-' + weatherJSON["weather"][0]["id"] + ' owf-5x"></i>';

        result.innerHTML = "<p>" + city + ", " + countryCode + "<br>" + fahrenheit + " ºF" + "<br>" + mainWeather + "<br>" + icon + "</p>";

      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();

  }

  function error(){
    result.innerHTML = "<p>Unable to retrieve your location, please enable GPS.</p>";
  }

  result.innerHTML = "Retrieving...";

  navigator.geolocation.getCurrentPosition(success,error);

};







