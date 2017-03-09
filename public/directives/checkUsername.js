angular.module('Zurival')
    .directive('checkUsername', ['$parse', function($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    ctrl.$setValidity('check', /^[a-zA-Z0-9]*$/.test(value));
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                scope.$watch('checkUsername', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
