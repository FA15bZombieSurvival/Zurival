angular.module('Zurival')
    .directive('checkLogin', ['authentication', function(authentication) {
        return {
            restrict: 'A',
            require 'ngModel',
            check: function check() {
                if(authentication.isLoggedIn()) {
                    document.getElementById('navigationUser').
                }
            }
        }
    }]);
