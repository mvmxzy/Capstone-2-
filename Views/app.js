angular.module('snowrider', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "./views/jumbo/jumbo.html",
                controller: 'jumboCtrl'
            })
            .state('guide', {
                url: '/guide',

                // templateUrl: "./views/guides/guides.html",
                // controller: 'guidesCtrl',

                views: {
                    '': {
                        templateUrl: "./views/guides/guides.html",
                        controller: 'guidesCtrl',
                    },

                    "featured@guide": {
                        templateUrl: './views/guides/resort.html'
                    }
                }

            })
            .state('gear', {
                url: '/gear',
                templateUrl: './views/gear/gear.html'
            })
            .state('search', {
              url: '/search',
              templateUrl: './views/search/search.html',
              controller: 'searchCtrl'
            })
    })
