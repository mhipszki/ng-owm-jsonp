'use strict';

var app = angular.module('owmClient', []);

app.controller('owmClient.controller', function($scope, config) {
  $scope.config = config;
});

app.constant('config', {
  title: 'Open Weather Map Client',
  cities: [
    'London',
    'Luton',
    'Manchester',
    'Birmingham'
  ]
});