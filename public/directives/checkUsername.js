angular.module('Zurival')
    .directive('checkUsername', ['$parse', function($parse) {
        return {
            // Restricts the directive only to be as an attribute.
            restrict: 'A',
            require: 'ngModel',
            // The link function is responsible for registering DOM listeners as well as updating the DOM.
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    ctrl.$setValidity('check', /^[a-zA-Z0-9]*$/.test(value));
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                // Watches the input field with the given attribute and checks if the current value is valid.
                scope.$watch('checkUsername', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
