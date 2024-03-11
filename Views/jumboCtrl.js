angular.module('snowrider')
  .controller('jumboCtrl', function ($scope, $sce) {
    $scope.vid = $sce.trustAsResourceUrl('../img/jumbo.mp4');
  })
  .directive('jumboDirective', function() {

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

              link: function(scope, elem, attrs) { //elem attribute was different, so it was not applying



              }

          }

      })
