'use strict';

var app = angular.module('owmClient', []);

app.controller('owmClient.controller', function($scope) {
  $scope.client = {
    title: 'Open Weather Map Client'
  };
});