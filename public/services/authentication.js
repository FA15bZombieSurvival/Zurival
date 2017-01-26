(function() {
    angular.module("Zurival")
        .service("authentication", authentication);

        authentication.$inject = ["$http", "$window"];
        function authentication($http, $window) {

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

            var register = function(user) {
                return $http.post("/register", user).success(function(data){
                    saveToken(data.token);
                });
            };

            var login = function(user) {
                return $http.post("/api/login", user).success(function(data) {
                    saveToken(data.token);
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
