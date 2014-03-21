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
});