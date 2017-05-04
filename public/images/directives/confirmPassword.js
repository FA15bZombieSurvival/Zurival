angular.module('Zurival')
    .directive('confirmPassword', ['$parse', function($parse) {
        return {
            // Restricts the directive only to be as an attribute.
            restrict: 'A',
            scope: {
                matchTarget: '=',
            },
            require: 'ngModel',
            // The link function is responsible for registering DOM listeners as well as updating the DOM.
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    ctrl.$setValidity('match', value === scope.matchTarget);
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);

                // This is to force validator when the original password gets changed
                scope.$watch('matchTarget', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
