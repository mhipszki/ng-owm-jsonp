'use strict';

var app = angular.module('owmClient', ['ui.bootstrap']);

app.controller('owmClient.controller', function($scope, config, owmAPI) {
  $scope.config = config;

  $scope.weather = {};

  $scope.hideWeatherData = function() {
    $scope.weather = {};
  };

  $scope.updateWeatherOf = function(city) {
    owmAPI.getCurrentWeatherInfoOf(city, storeWeather, showError);
  };

  var storeWeather = function(data){
    $scope.weather = processWeather(data);
  };

  var showError = function(data, status, headers, config) {
    $scope.weather.hasError = true;
  };

  var processWeather = function(data) {
    var weather = {};

    weather.isRetrieved = parseInt(data.cod)===200;
    weather.hasError = !weather.isRetrieved;

    var current = angular.extend({}, data.weather[0]);
    current.wind = data.wind;
    current.temperature = toCelsius(data.main.temp);
    current.range = {
      min: toCelsius(data.main.temp_min),
      max: toCelsius(data.main.temp_max)
    };    

    weather.data = data;
    weather.current = current;

    return weather;
  };

  var toCelsius = function(kelvin) {
    return roundToDecimal(kelvin - 273.15);
  };

  var roundToDecimal = function(value) {
    return Math.round(value*10)/10;
  };
});

app.constant('config', {
  title: 'Open Weather Map Client',
  cities: [
    'London',
    'Luton',
    'Manchester',
    'Birmingham'
  ],
  selectedCity: '',
  apiUrl: 'http://api.openweathermap.org/data/2.5/weather?q={{city}},UK&callback=JSON_CALLBACK',
  cityToken: '{{city}}'
});

app.service('owmAPI', function($http, config) {
  this.getCurrentWeatherInfoOf = function(city, onSuccess, onError) {
    $http.jsonp(config.apiUrl.replace(config.cityToken, city)).success( onSuccess ).error( onError );
  };
});