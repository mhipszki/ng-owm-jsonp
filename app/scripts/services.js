'use strict';

var app = angular.module('owmClient');

app.service('weatherService', function($http, config) {
  this.getCurrentWeatherOf = function(city, onSuccess, onError) {
    $http.jsonp(config.apiUrl.replace(config.cityToken, city)).success( onSuccess ).error( onError );
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

    weather.getAt = data.dt*1000;
    weather.lon = data.coord.lon;
    weather.lat = data.coord.lat;
    weather.city = data.name;
    weather.pressure = data.main.pressure;
    weather.humidity = data.main.humidity;
    weather.wind = data.wind;
    weather.sunrise = data.sys.sunrise*1000;
    weather.sunset = data.sys.sunset*1000;

    weather.temperature = temperature;

    return weather;
  };

  var toCelsius = function(kelvin) {
    return roundToDecimal(kelvin - 273.15);
  };

  var roundToDecimal = function(value) {
    return Math.round(value*10)/10;
  };
});