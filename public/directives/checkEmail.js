angular.module('Zurival')
    .directive('checkEmail', ['$parse', function($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    ctrl.$setValidity('check', /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value));
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                scope.$watch('checkEmail', function(newval, oldval) {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }]);
