angular.module('snowrider')
    .directive('menuDirective', function() {

        return {
            restrict: 'EA',

            templateUrl: './views/menu/menu.html',

            scope: {
                // lesson: '=',
                // datAlert: '&'
            },

            controller: function($scope) {

            },

            link: function(scope, elem, attrs) { //elem attribute was different, so it was not applying

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
              }
            );

            // Show sideNav
  // $('.button-collapse').sideNav('show');
  // // Hide sideNav
  // $('.button-collapse').sideNav('hide');
  // // Destroy sideNav
  // $('.button-collapse').sideNav('destroy')


            }

        }

    })
