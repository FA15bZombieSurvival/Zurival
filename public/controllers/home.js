angular.module('Zurival')
    .controller('HomeCtrl', ['$scope', 'authentication', function($scope, authentication) {

            checkPlayBtnStatus();

          $scope.title = 'Zurival - Welcome to the end!';

          function checkPlayBtnStatus() {
              if(authentication.isLoggedIn()) {
                  $scope.playBtnLink = '.game.lobby';
              }
              else {
                  $scope.playBtnLink = 'root.login';
              }
          }
    }]);
