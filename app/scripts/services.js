'use strict';

function WeatherService($http, APIUrl, cityToken) {

  this.getCurrentWeatherOf = function(city, onSuccess, onError) {
    var url = this.getUrlFor(city);
    $http.jsonp( url ).success( onSuccess ).error( onError );
  };

  this.getUrlFor = function(city) {
    return APIUrl.replace(cityToken, city);
  };

  this.process = function(data) {
    var weather = angular.extend({}, data.weather[0]);

    weather.isRetrieved = parseInt(data.cod)===200;
    weather.hasError = !weather.isRetrieved;

    var temperature = {};
    temperature.current = toCelsius(data.main.temp);
    temperature.range = {
      min: toCelsius(data.main.temp_min),
      max: toCelsius(data.main.temp_max)
    };

    weather.getAt = toMillisecs( data.dt );
    weather.lon = data.coord.lon;
    weather.lat = data.coord.lat;
    weather.city = data.name;
    weather.pressure = data.main.pressure;
    weather.humidity = data.main.humidity;
    weather.wind = data.wind;
    weather.sunrise = toMillisecs( data.sys.sunrise );
    weather.sunset = toMillisecs( data.sys.sunset );

    weather.temperature = temperature;

    return weather;
  };

  function toMillisecs(seconds) {
    return seconds * 1000;
  }

  function toCelsius(kelvin) {
    return roundToDecimal(kelvin - 273.15);
  }

  function roundToDecimal(value) {
    return Math.round(value*10)/10;
  }
}