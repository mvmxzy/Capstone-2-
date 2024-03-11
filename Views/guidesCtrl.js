angular.module('snowrider')
  .controller('guidesCtrl', function ($scope, $sce) {

    $scope.val = false;

    $(document).ready(function(){
      $('.parallax').parallax();
    });


    AOS.init({
    duration: 1300,
    easing: 'ease-in-out-back'

    });

  })
