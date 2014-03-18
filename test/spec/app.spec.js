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
});
