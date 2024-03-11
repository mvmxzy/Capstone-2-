'use strict';

angular.module('snowrider', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: "./views/jumbo/jumbo.html",
        controller: 'jumboCtrl'
    }).state('guide', {
        url: '/guide',

        // templateUrl: "./views/guides/guides.html",
        // controller: 'guidesCtrl',

        views: {
            '': {
                templateUrl: "./views/guides/guides.html",
                controller: 'guidesCtrl'
            },

            "featured@guide": {
                templateUrl: './views/guides/resort.html'
            }
        }

    }).state('gear', {
        url: '/gear',
        templateUrl: './views/gear/gear.html'
    }).state('search', {
        url: '/search',
        templateUrl: './views/search/search.html',
        controller: 'searchCtrl'
    });
});
'use strict';

angular.module('snowrider').service('mainService', function ($http, $q) {

  // google places Map api key
  var key2 = '&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';
  var key = '&key=AIzaSyAt3K14Jk4M2Kkw0onwCbQy5O8lBX5HJiE';

  var resorts;
  var mainService = this;
  // with geoplugin api
  this.city = geoplugin_city();
  this.state = geoplugin_region();
  this.lat = geoplugin_latitude();
  this.long = geoplugin_longitude();

  // search request
  var searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
  // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

  var searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=ski+snowboard+resorts&rankBy=distance';
  var location = '&location=' + this.lat + ',' + this.long;
  var radius = '&radius=20000';

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  this.getResorts = function (geo) {
    // when to convert the user iputed city name or zipcode
    var deferred = $q.defer();

    if (geo) {
      location = '&location=' + geo.lat + ',' + geo.lng; //had to reset the location parameter correctly
      console.log(location);
    }
    $http({

      method: 'GET',
      url: searchText + location + key
      //  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise' + key


      // headers: {reference
      //
      //   'Access-Control-Allow-Origin: * ',
      //   'Access-Control-Allow-Headers: AUTHORIZATION',
      //   'Access-Control-Allow-Methods: GET'
      // }
    }).then(function (response) {
      console.log(response);
      resorts = response.data.results;
      /// omg you can actually get the reference by google map api photo url thne
      /// putting your refernce after and api
      console.log(resorts);

      // for (var i = 0; i < resorts.length; i++) {
      //   // var ref = response[i].photos[0].photo_reference
      //   console.log(resorts)
      //
      //   $http({
      //     method: 'GET',
      //     url:
      //      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key
      //     // 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
      //   }).then(function (i, response) {
      //     resorts[i].photos = response;
      //   }.bind(null, i))
      //
      //
      // }
      var ref;
      var phourl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=';
      for (var i = 0; i < resorts.length; i++) {
        if (resorts[i].photos) {
          ref = resorts[i].photos[0].photo_reference;

          resorts[i].photo = phourl + ref + key;
        } else {
          resorts[i].photo = 'img/jumbimg.png';
        }

        // mainService.getPhoto( response.data.results[i].photos[0].photo_reference).then(function (i, photo) {
        //   // let blob = new Blob([response.data], {type: imageType});
        //   // return (window.URL || window.webkitURL).createObjectURL(blob);
        //
        //   response.data.results[i].photos = photo;
        //
        //   console.log(resorts);
        // }.bind(null, i));
        // var service = new google.maps.places.PlacesService(map);

        // service.getDetails({
        //   placeId: resorst[i].placeId
        // }, function(place, status) {
        //   console.log('hey');
        //   resorts[i] = place;
        // })
      }

      deferred.resolve(resorts);
    });
    // .then(function (response) {
    //
    //
    // })


    return deferred.promise;
  };

  this.getPhoto = function (reference) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
      //  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key,
      //  responseType: 'arraybuffer'
      //
    }).then(function (res) {

      return res.data;

      // var convertImg = _arrayBufferToBase64(response.data);
      // console.log(convertImg);
      // return convertImg;

    });
  };

  // this.getPhotos();


  this.pass = function () {
    return resorts;
  };

  var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var components1 = '&components=administrative_area_level_3:';
  var components2 = '|postal_code:';

  this.geoCode = function (zipCity) {
    //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
    return $http({
      method: 'GET',
      url: geoUrl + zipCity + key
    }).then(function (results) {

      // if(results.data.status === "ZERO_RESULTS") {
      //   return false;
      // }

      console.log(results);
      var geoData = {};

      geoData.lat = results.data.results[0].geometry.location.lat;
      geoData.lng = results.data.results[0].geometry.location.lng;
      // geoData.zip = zipCity;
      // const address = results.data.results[0].formatted_address;
      // geoData.address = address.slice(0, address.indexOf(zip)).trim();
      // geoData.city = address.slice(0, address.indexOf(zip)).trim();//parse the data down to just the city and state
      return geoData;
    });
  };

  // '"https://maps.googleapis.com/maps/api/geocode/json?address=Dallas&components=administrative_area:Dallas|postal_code:Dallas&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg"'
});
'use strict';

angular.module('snowrider').service('mapService', function ($http, mainService) {

    var map = void 0;
    var service = void 0;
    var infowindow = void 0;
    var currentL = void 0;
    this.initMap = function (geo, results) {
        //location
        if (geo) {
            console.log(geo);
            currentL = geo;
            // {lat: Number(geo.lat), lng: Number(geo.lng)
        } else {
            currentL = {
                lat: Number(mainService.lat),
                lng: Number(mainService.long)
            };
        }

        //creating the new map with the geocode of the currentL
        map = new google.maps.Map(document.getElementById('map'), {
            center: currentL,
            zoom: 10
        });

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);

        // service.textSearch({
        //   location: currentL,
        //   radius: 30000,
        //   query: ['ski, snowboard resorts'],
        //   rankBy: google.maps.places.RankBy.DISTANCE
        // }, callback);
        if (results || mainService.pass()) {
            // add this condition in order to prevent the call unless an array from the result or directly from the mainService
            callback(results); // that way we can we the init map function function as a way to center to the curren location
        }
    };

    function callback(data) {
        // if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log(results)
        // for (var i = 0; i < results.length; i++) {
        //   createMarker(results[i]); // creating a makrer for each of the result in the map
        // }
        var arr;
        console.log(data);
        if (data) {
            //made a condition to not initia map right away
            arr = data;
        } else {
            arr = mainService.pass();
        }
        for (var i = 0; i < arr.length; i++) {
            createMarker(arr[i]); // creating a makrer for each of the result in the map
        }
        // }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
            // photo: place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name + '<br>' + place.formatted_address);
            // infowindow.setContent(place.formatted_address);

            infowindow.open(map, this);
        });
    }
});
'use strict';

angular.module('snowrider').directive('gearDirective', function () {

  return {
    restrict: 'EA',

    templateUrl: './views/gear/gearDirective.html',

    scope: {
      // lesson: '=',
      // datAlert: '&'
    },

    controller: function controller($scope) {
      $scope.gears = gears;

      $(document).ready(function () {
        $('.carousel').carousel();
      });
    },

    link: function link(scope, elem, attrs) {
      //elem attribute was different, so it was not applying

      $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });

      // scope.getSchedule.then(function (response) {
      //   scope.schedule = response.data;
      //
      //   for (var i = 0; i < response.data.length; i++) {
      //
      //     if (response.data[i].lesson === scope.lesson) {
      //       scope.lessonDay = response.data[i].weekday
      //       elem.css("text-decoration", "line-through");
      //       return;
      //     }
      //   }
      // })
    }

  };
});

var gears = [{
  img: '../../img/gear/Moment.jpg',
  desc: 'Our most powerful board built for wide-open freeriding, the full-camber Moment Generator thrives on mandatory cliffs, exposed traverses, and butt-clenchingly steep chutes.',
  url: 'http://deviationusa.com/product/moment-generator/'

}, {
  img: '../../img/gear/alpineglow.png',
  desc: 'Top Sheet Designs',
  url: 'http://deviationusa.com/product/moment-generator/'
}, {
  img: '../../img/gear/wood.png',
  desc: 'Wood Veneer - Marbled Ako',
  url: 'https://www.wagnerskis.com/gallery/'
}, {
  img: '../../img/gear/skatingX.png',
  desc: 'Cross country set: ski, boots and poles',
  url: 'http://pistetopowder.com/rental/'

}, {
  img: '../../img/gear/ABSp.jpg',
  desc: 'ABS P.Ride (Mit Schaufel und Sonde)',
  url: 'http://pistetopowder.com/rental/'

}, {
  img: '../../img/gear/headset.jpg',
  desc: 'Perfect fitting ski helmet of Cébé in lime and blue',
  url: 'https://www.vaola.co.uk/p/cebe-fireball-ski-helmet-lime-blue-2378026.html'
}];
'use strict';

angular.module('snowrider').controller('jumboCtrl', function ($scope, $sce) {
    $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
}).directive('jumboDirective', function () {

    return {
        restrict: 'EA',

        templateUrl: './views/jumbo/jumbo.html',

        // scope: {
        //     // lesson: '=',
        //     // datAlert: '&'
        // },

        // controller: function($scope) {
        //
        // },

        link: function link(scope, elem, attrs) {//elem attribute was different, so it was not applying


        }

    };
});
'use strict';

angular.module('snowrider').directive('menuDirective', function () {

    return {
        restrict: 'EA',

        templateUrl: './views/menu/menu.html',

        scope: {
            // lesson: '=',
            // datAlert: '&'
        },

        controller: function controller($scope) {},

        link: function link(scope, elem, attrs) {
            //elem attribute was different, so it was not applying

            // Initialize collapse button
            // $(".button-collapse").sideNav();
            // Initialize collapsible (uncomment the line below if you use the dropdown variation)
            //$('.collapsible').collapsible();
            // elem.on('click', function () {
            //   $('.button-collapse').sideNav('show');
            // })

            $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 240
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens
            });

            // Show sideNav
            // $('.button-collapse').sideNav('show');
            // // Hide sideNav
            // $('.button-collapse').sideNav('hide');
            // // Destroy sideNav
            // $('.button-collapse').sideNav('destroy')

        }

    };
});
'use strict';

angular.module('snowrider').controller('guidesCtrl', function ($scope, $sce) {

  $scope.val = false;

  $(document).ready(function () {
    $('.parallax').parallax();
  });

  AOS.init({
    duration: 1300,
    easing: 'ease-in-out-back'

  });
});
'use strict';

angular.module('snowrider').controller('searchCtrl', function ($scope, mainService, mapService) {

    var geoData = void 0;
    var data;
    $scope.photos = [];

    $scope.getResorts = function (zipOcity) {
        // whne ng-clicked to initiate
        mainService.getResorts().then(function (results) {
            $scope.resorts = results; // so i can scope it

            console.log(results);

            return results;
        });
        // .then(function(res) {
        //   for (var i = 0; i < res.length; i++) { // loop  though the result and try to get the photo for each place hile keeping it on scope
        //     mainService.getPhotos(res[i].photos[0].photo_reference).then(function (response) {
        //       $scope.photos.push(response)
        //       console.log($scope.photos);
        //     })
        //
        //   }
        // })


        //  return data;
    };

    $scope.showMap = function () {
        mapService.initMap();
    };

    $scope.showMap(); //initialize an empty map on load


    $scope.geoCode = function (zipCity) {

        mainService.geoCode(zipCity).then(function (response) {
            console.log(response);
            geoData = response;
            return geoData;
        }).then(function (geo) {
            console.log(geo);
            // var data = $scope.getResorts(geo);
            // console.log($scope.getResorts(geo));

            // return  $scope.getResorts(geo)
            return mainService.getResorts(geo).then(function (results) {
                $scope.resorts = results; // so i can scope it
                return results;
            });
        }).then(function (results) {
            console.log(results);
            console.log(geoData);
            mapService.initMap(geoData, results);
        });
    };
});
//# sourceMappingURL=bundle.js.map
