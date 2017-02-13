(function() {
    angular.module("Zurival")
        .service("authentication", authentication);

        authentication.$inject = ["$http", "$window", "$q", "$rootScope"];
        function authentication($http, $window, $q, $rootScope) {

            var saveToken = function(token){
                $window.localStorage["mean-token"] = token;
            }

            var getToken = function() {
                return $window.localStorage["mean-token"];
            }

            // is var necessary? ref: https://www.sitepoint.com/user-authentication-mean-stack/
            var logout = function() {
                $window.localStorage.removeItem("mean-token");
            }

            var isLoggedIn = function() {
                var token = getToken();
                var payload;

                if(token){
                    payload = token.split(".")[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return payload.exp > Date.now() / 1000;
                }
                else {
                    return false;
                }
            };

            var currentUser = function() {
                if(isLoggedIn()){
                    var token = getToken();
                    var payload = token.split(".")[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);

                    return {
                        username: payload.username,
                        email: payload.email
                    }
                }
            }

            var register = function(user, callback) {
                return $http.post("/api/registration", user)
                .success(function(data){
                    saveToken(data.token);
                    callback(null);
                })
                .error(function(data){
                    callback(data);
                });
            };

            var login = function(user, callback) {
                return $http.post("/api/login", user)
                .success(function(data) {
                    saveToken(data.token);
                    callback(null);
                })
                .error(function(data){
                    callback(data);
                });
            };

            return {
                saveToken: saveToken,
                getToken: getToken,
                logout: logout,
                isLoggedIn: isLoggedIn,
                currentUser: currentUser,
                register: register,
                login: login
            };
        }
})();
