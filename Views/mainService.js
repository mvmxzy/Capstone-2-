angular.module('snowrider')
    .service('mainService', function($http, $q) {

        // google places Map api key
        const key2 = '&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg';
        const key = '&key=AIzaSyAt3K14Jk4M2Kkw0onwCbQy5O8lBX5HJiE';

        var resorts;
        var mainService = this;
        // with geoplugin api
        this.city = geoplugin_city();
        this.state = geoplugin_region();
        this.lat = geoplugin_latitude();
        this.long = geoplugin_longitude();

        // search request
        let searchKeyword = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
        // -33.8670522,151.1957362&type=restaurant&keyword=&key=YOUR_API_KEY

        let searchText = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=ski+snowboard+resorts&rankBy=distance'
        var location = '&location=' + this.lat + ',' + this.long;
        let radius = '&radius=20000';



        function _arrayBufferToBase64(buffer) {
          var binary = '';
          var bytes = new Uint8Array(buffer);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return window.btoa(binary);
        }


        this.getResorts = function(geo) { // when to convert the user iputed city name or zipcode
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
            }).then(function(response ) {
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
                    }else {
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

            })
            // .then(function (response) {
            //
            //
            // })


          return deferred.promise
        }

        this.getPhoto = function (reference) {
          return $http({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + key
            //  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU' + key,
            //  responseType: 'arraybuffer'
            //
          })
          .then(function (res) {

            return res.data;

            // var convertImg = _arrayBufferToBase64(response.data);
            // console.log(convertImg);
            // return convertImg;


          })
        }


        // this.getPhotos();


        this.pass = function() {
            return resorts;
        }

        const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        const components1 = '&components=administrative_area_level_3:';
        const components2 = '|postal_code:';

        this.geoCode = function(zipCity) {
            //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
            return $http({
                method: 'GET',
                url: geoUrl + zipCity + key
            }).then(function(results) {

                // if(results.data.status === "ZERO_RESULTS") {
                //   return false;
                // }

                console.log(results);
                let geoData = {};

                geoData.lat = results.data.results[0].geometry.location.lat;
                geoData.lng = results.data.results[0].geometry.location.lng;
                // geoData.zip = zipCity;
                // const address = results.data.results[0].formatted_address;
                // geoData.address = address.slice(0, address.indexOf(zip)).trim();
                // geoData.city = address.slice(0, address.indexOf(zip)).trim();//parse the data down to just the city and state
                return geoData;
            })
        }

        // '"https://maps.googleapis.com/maps/api/geocode/json?address=Dallas&components=administrative_area:Dallas|postal_code:Dallas&key=AIzaSyCY0pUHVH0TCKwnYDFZpl2xkqGkexLRjVg"'

    })
