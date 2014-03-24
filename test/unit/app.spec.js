'use strict';

describe('owmClient', function () {

  describe('controller', function() {

    beforeEach(module('owmClient'));

    var scope;
    var controller;
    var config;
    var weatherService;

    beforeEach(inject(function ($controller, $rootScope, _weatherService_) {
      scope = $rootScope.$new();
      controller = $controller('owmClient.controller', {
        $scope: scope
      });
      config = scope.config;
      weatherService = _weatherService_;
    }));

    it('should define the app title', function () {
      expect(config.title.length).toBeGreaterThan(0);
    });

    it('should define four UK city names', function() {
      expect(config.cities.length).toBe(4);
    });

    it('should have London in cities', function() {
      expect(config.cities).toContain('London');
    });

    it('should not have a city selected at first', function() {
      expect(config.selectedCity).toBe('');
    });

    it('should have an empty weather object defined', function() {
      expect(scope.weather).toEqual({});
    });

    it('should clear weather data when hideWeatherData() called', function() {
      scope.weather.testValue = 1;
      scope.hideWeatherData();
      expect(scope.weather.testValue).toBeUndefined();
    });

    it('should use weatherService to gather weather information', function() {
      spyOn(weatherService, 'getCurrentWeatherOf');
      var city = 'a UK city';
      scope.updateWeatherOf(city);
      var service = weatherService.getCurrentWeatherOf;
      expect(service).toHaveBeenCalled();
      expect(service.mostRecentCall.args[0]).toBe(city);
    });
  });
});
