'use strict';

var app = angular.module('owmClient', ['ui.bootstrap']);

app.provider('weatherService', function WeatherServiceProvider() {

  var APIUrl;
  var cityToken;

  this.setAPIUrl = function(value) {
    APIUrl = value;
  };

  this.setCityToken = function(value) {
    cityToken = value;
  };

  var weatherServiceFactory = function($http) {
    return new WeatherService($http, APIUrl, cityToken);
  };

  this.$get = ['$http', weatherServiceFactory];
});

app.config(['weatherServiceProvider', 'config', function(weatherService, config) {
  weatherService.setAPIUrl(config.apiUrl);
  weatherService.setCityToken(config.cityToken);
}]);

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

app.controller('owmClient.controller', function($scope, config, weatherService) {
  $scope.config = config;

  $scope.weather = {};

  $scope.hideWeatherData = function() {
    $scope.weather = {};
  };

  $scope.updateWeatherOf = function(city) {
    weatherService.getCurrentWeatherOf(city, storeWeather, showError);
  };

  var storeWeather = function(data){
    $scope.weather = weatherService.process(data);
  };

  var showError = function() {
    $scope.weather.hasError = true;
  };
});