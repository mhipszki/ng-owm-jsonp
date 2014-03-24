'use strict';

describe('weatherService', function () {

  beforeEach(module('owmClient'));

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
