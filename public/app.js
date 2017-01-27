var app = angular.module("Zurival", ["ui.router"]);

app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('root',{
          url: '',
          views: {
            'navigation': {
                templateUrl: 'views/navigation.html',
                controller: 'NavigationCtrl'
            },
            "content": {
                templateUrl: 'views/home.html',
                controller: "HomeCtrl"
            }
          }
        })
        .state('root.home', {
            url: '/home',
            views: {
                "content@": {
                    templateUrl: 'views/home.html',
                    controller: "HomeCtrl"
                }
            }
        })
        .state("root.about", {
            url: "/about",
            views: {
                "content@": {
                    templateUrl: 'views/about.html',
                    controller: "AboutCtrl"
                }
            }
        })
        .state("root.login", {
            url: "/login",
            views: {
                "content@": {
                    templateUrl: 'views/login.html',
                    controller: "LoginCtrl"
                }
            }
        })
        .state("root.registration", {
            url: "/registration",
            views: {
                "content@": {
                    templateUrl: 'views/signup.html',
                    controller: "RegistrationCtrl"
                }
            }
        });

        $urlRouterProvider.otherwise("home");
    }
]);
