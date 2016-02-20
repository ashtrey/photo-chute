(function () {
    "use strict";

    angular.module("photoApp", ["ngAnimate", "ngRoute", "photoServices"])
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/photolist", {
                controller: "photoListController",
                controllerAs: "vm",
                templateUrl: "/views/photoList.html"
            });

            $routeProvider.otherwise({ redirectTo: "/" });
        }]);
})();
