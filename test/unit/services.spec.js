'use strict';

describe('weatherService', function () {

  beforeEach(module('owmClient', 'owmAPImock'));

  var $httpBackend;
  var weatherService;
  var config;
  var city = 'a city';

  function expectResponseWith(code, data) {
    $httpBackend.whenJSONP( weatherService.getUrlFor( city ) ).respond(code, data);
  }

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    weatherService = $injector.get('weatherService');
    config = $injector.get('config');
  }));

  describe('process method of successful response', function() {
    var response;
    var weather;

    beforeEach(inject(function ($injector) {
      response = $injector.get('successResponseFromRemoteAPI');
      weather = weatherService.process( response );
    }));

    it('should return a weather object', function() {
      expect(weather).not.toBeUndefined();
    });

    it('should set isRetrieved to true', function() {
      expect(weather.isRetrieved).toBe( true );
    });

    it('should set hasError to false', function() {
      expect(weather.hasError).toBe( false );
    });

    it('should calculate current temperature', function() {
      expect(weather.temperature.current).toEqual( 17.0 );
    });

    it('should calculate temperature range', function() {
      expect(weather.temperature.range.min).toEqual( 16.1 );
      expect(weather.temperature.range.max).toEqual( 17.8 );
    });

    it('should calculate time of data retrieval in millisecs', function() {
      expect(weather.getAt).toEqual( response.dt * 1000 );
    });

    it('should set geolocation of measurement', function() {
      expect(weather.lon).toEqual( response.coord.lon );
      expect(weather.lat).toEqual( response.coord.lat );
    });

    it('should set the city name', function() {
      expect(weather.city).toEqual( response.name );
    });

    it('should set the pressure', function() {
      expect(weather.pressure).toEqual( response.main.pressure );
    });

    it('should set the humidity', function() {
      expect(weather.humidity).toEqual( response.main.humidity );
    });

    it('should set the wind', function() {
      expect(weather.wind).toEqual( response.wind );
    });

    it('should calculate sunrise in millisecs', function() {
      expect(weather.sunrise).toEqual( response.sys.sunrise * 1000 );
    });

    it('should calculate sunset in millisecs', function() {
      expect(weather.sunset).toEqual( response.sys.sunset * 1000 );
    });
  });

  describe('getCurrentWeatherOf', function() {

    var onSuccess;
    var onError;

    beforeEach(inject(function() {
      onSuccess = jasmine.createSpy('onSuccess');
      onError = jasmine.createSpy('onError');
    }));

    it('should call the injected onSuccess method on response code 200', function() {
      expectResponseWith(200, '{ "cod": 200 }');

      weatherService.getCurrentWeatherOf(city, onSuccess, onError);

      $httpBackend.flush();

      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it('should call the injected onError method on response code 404', function() {
      expectResponseWith(404, '{ "cod": 404 }');

      weatherService.getCurrentWeatherOf(city, onSuccess, onError);

      $httpBackend.flush();

      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
