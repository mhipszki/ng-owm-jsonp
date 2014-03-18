'use strict';

describe('owmClient', function () {

  beforeEach(module('owmClient'));

  var scope;
  var controller;
  var config;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('owmClient.controller', {
      $scope: scope
    });
    config = scope.config;
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

});
