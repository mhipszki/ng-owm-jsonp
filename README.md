Open Weather Map client
============

An example AngularJS project using JSONP to fetch data from Open Weather Map service.

Using:

- Yeoman Angular generator for basic scaffolding
- Twitter's Bootstrap and Angular UI Bootstrap for the view
- AngularJS directives, controllers, providers, $http service for JSONP
- Jasmine BDD unit tests run by Karma
- Protractor/Jasmine BDD e2e tests run on Selenium/WebDriver

Tests:
- can be runcross-browser, you just have to reference more browsers in Karma's and Protractor's config files
- atm Karma can run tests against PhantomJS and Chrome as configured, other runners must be installed first
- atm Protractor is only configured to run with the Chrome WebDriver

After cloning run

```
$ npm install
$ bower install
```

assuming you have Node.js, Grunt, Bower and Protractor w/Chrome WebDriver already installed.

Project can be run locally on port 9000 by this command

```
$ grunt serve
```

Unit tests can be run manually

```
$ grunt test
```

To run E2E tests use

```
$ protractor test/protractor.conf.js
```

To build the project (linted, minified, concatenated, uglified etc.) run

```
$ grunt build
```

The compiled project can be found under the `dist` folder

To check the built project in a browser run

```
$ grunt serve:dist
```

#### TODO

- add more tests to WeatherService provider
- add more tests for data processing of the WeatherService
- add tests for directives
- decouple directives from main scope
