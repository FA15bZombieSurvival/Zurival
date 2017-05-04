angular.module('Zurival')
    .directive('checkPassword', ['$parse', function($parse) {
        return {
            // Restricts the directive only to be as an attribute.
            restrict: 'A',
            require: 'ngModel',
            // The link function is responsible for registering DOM listeners as well as updating the DOM.
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    if(/^(.)*([0-9])(.)*$/.test(value)) ctrl.$setValidity('minNumber', true);
                    else ctrl.$setValidity('minNumber', false);
                    if(/^(.)*([A-Z])(.)*$/.test(value)) ctrl.$setValidity('minBigChar', true);
                    else ctrl.$setValidity('minBigChar', false);

                    ctrl.$setValidity('check', /^((?=.*[0-9])(?=.*[A-Z])([a-z0-9A-Z]){6,20})$/.test(value));
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                // Watches the input field with the given attribute and checks if the current value is valid.
                scope.$watch('checkPassword', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
