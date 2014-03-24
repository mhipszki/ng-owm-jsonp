'use strict';

describe("owm client", function() {

  function Page() {

    this.load = function() {
      browser.get('/index.html');
    };

    this.cities = element.all(by.repeater('city in config.cities'));

    this.load();
  };

  var page;

  beforeEach(function() {
    page = new Page();
  });

  it("should display all 4 cities as a button", function() {
    expect(page.cities.count()).toBe(4);
  });

  it("should highlight a button on click", function() {
    page.cities.get(0).then( function(button) {
      button.click();
      expect(button.getAttribute('class')).toMatch(/active/);
    });
  });

  it("should highlight only one button at a time", function() {
    page.cities.get(0).then( function(button) {
      button.click();
      expect(button.getAttribute('class')).toMatch(/active/);

      page.cities.get(1).then( function(otherButton) {
        otherButton.click();
        expect(otherButton.getAttribute('class')).toMatch(/active/);
        expect(button.getAttribute('class')).not.toMatch(/active/);
      });

    });
  });

});