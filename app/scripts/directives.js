'use strict';

var app = angular.module('owmClient');

app.directive('citySelector', function(){
  return {
    restrict: 'A',
    templateUrl: 'views/citySelector.tpl.html',
    replace: true
  };
});


app.directive('syncResultMessage', function(){
  return {
    restrict: 'A',
    templateUrl: 'views/syncResultMessage.tpl.html',
    replace: true
  };
});


app.directive('weatherDetails', function(){
  return {
    restrict: 'A',
    templateUrl: 'views/weatherDetails.tpl.html',
    replace: true
  };
});