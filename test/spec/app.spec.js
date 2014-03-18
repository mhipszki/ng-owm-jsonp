'use strict';

describe('owmClient', function () {

  beforeEach(module('owmClient'));

  var scope;
  var controller;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('owmClient.controller', {
      $scope: scope
    });
  }));

  it('should define the app title', function () {
    expect(scope.client.title.length).toBeGreaterThan(0);
  });

  it('should define four UK city names', function() {
    expect(scope.client.selectableCities.length).toBe(4);
  });

  it('should have London in selectable cities', function() {
    expect(scope.client.selectableCities).toContain('London');
  });

});
