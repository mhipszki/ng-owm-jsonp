'use strict';

var app = angular.module('owmClient', ['ui.bootstrap']);

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