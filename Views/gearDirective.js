angular.module('snowrider')
    .directive('gearDirective', function() {

        return {
            restrict: 'EA',

            templateUrl: './views/gear/gearDirective.html',

            scope: {
                // lesson: '=',
                // datAlert: '&'
            },

            controller: function($scope) {
              $scope.gears = gears;

              $(document).ready(function(){
                $('.carousel').carousel();
              });

            },

            link: function(scope, elem, attrs) { //elem attribute was different, so it was not applying

              $('a[href*="#"]:not([href="#"])').click(function() {
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

        }

    })



var gears = [
  {
    img: '../../img/gear/Moment.jpg',
    desc: 'Our most powerful board built for wide-open freeriding, the full-camber Moment Generator thrives on mandatory cliffs, exposed traverses, and butt-clenchingly steep chutes.',
    url: 'http://deviationusa.com/product/moment-generator/',

  },
  {
    img:'../../img/gear/alpineglow.png',
    desc: 'Top Sheet Designs',
    url: 'http://deviationusa.com/product/moment-generator/'
  },

  {
    img:'../../img/gear/wood.png',
    desc: 'Wood Veneer - Marbled Ako',
    url: 'https://www.wagnerskis.com/gallery/'
  },

  {
    img:'../../img/gear/skatingX.png',
    desc: 'Cross country set: ski, boots and poles',
    url: 'http://pistetopowder.com/rental/',

  },

  {
    img:'../../img/gear/ABSp.jpg',
    desc: 'ABS P.Ride (Mit Schaufel und Sonde)',
    url: 'http://pistetopowder.com/rental/'

  },

  {
    img:'../../img/gear/headset.jpg',
    desc: 'Perfect fitting ski helmet of Cébé in lime and blue',
    url: 'https://www.vaola.co.uk/p/cebe-fireball-ski-helmet-lime-blue-2378026.html'
  }
]
