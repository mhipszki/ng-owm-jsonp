'use strict';

var app = angular.module('owmClient', ['ui.bootstrap']);

app.controller('owmClient.controller', function($scope, config, owmAPI) {
  $scope.config = config;

  $scope.updateWeatherOf = function(city) {
    owmAPI.getCurrentWeatherInfoOf(city, showWeatherInfo);
  };

  var showWeatherInfo = function(data){
    console.log(data);
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
  this.getCurrentWeatherInfoOf = function(city, onSuccess) {
    $http.jsonp(config.apiUrl.replace(config.cityToken, city)).success( onSuccess );
  };
});