var app = angular.module("Zurival", [
    "ui.router",
    "Zurival.game",
    "Zurival.game.lobby",
    "Zurival.game.create_game",
    "Zurival.game.game"
]);

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
        .state("root.game", {
            url: "/game"
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
                    templateUrl: 'views/registration.html',
                    controller: "RegistrationCtrl"
                }
            }
        })
        .state("root.profile", {
            url: "/profile",
            views: {
                "content@": {
                    templateUrl: 'views/profile.html',
                    controller: "ProfileCtrl"
                }
            }
        })
        .state("root.friends", {
            url: "/friends",
            views: {
                "content@": {
                    templateUrl: 'views/friends.html',
                    controller: "FriendsCtrl"
                }
            }
        });

        $urlRouterProvider.otherwise("home");
    }
]);
