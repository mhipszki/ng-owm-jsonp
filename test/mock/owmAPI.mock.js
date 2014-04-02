'use strict';

angular.module('owmAPImock', [])
.constant('successResponseFromRemoteAPI', {
    "base": "cmc stations",
    "clouds": {
        "all": 80
    },
    "cod": 200,
    "coord": {
        "lat": 51.880000000000003,
        "lon": -0.41999999999999998
    },
    "dt": 1396441499,
    "id": 2643339,
    "main": {
        "humidity": 98,
        "pressure": 1004,
        "temp": 290.14999999999998,
        "temp_max": 290.93000000000001,
        "temp_min": 289.25999999999999
    },
    "name": "Luton",
    "rain": {
        "3h": 0
    },
    "sys": {
        "country": "GB",
        "message": 0.039100000000000003,
        "sunrise": 1396416774,
        "sunset": 1396463839
    },
    "weather": [
        {
            "description": "haze",
            "icon": "50d",
            "id": 721,
            "main": "Haze"
        }
    ],
    "wind": {
        "deg": 160,
        "gust": 6.1699999999999999,
        "speed": 2.0600000000000001
    }
});