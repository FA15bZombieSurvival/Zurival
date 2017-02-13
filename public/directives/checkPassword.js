angular.module('Zurival')
    .directive('checkPassword', ['$parse', function($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
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
                scope.$watch('checkPassword', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
