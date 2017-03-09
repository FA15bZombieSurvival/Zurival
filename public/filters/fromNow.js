angular.module('Zurival').
  filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
});
