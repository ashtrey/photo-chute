(function () {
    "use strict";

    angular.module("photoServices", [])
        .factory("instagramService", ["$http", function ($http) {
            var photoService = {};
            photoService.getPhotos = function (maxCount) {
                var photoResults = $http({
                    method: "JSONP",
                    url: "https://api.instagram.com/v1/tags/consumeraffairs/media/recent",
                    params: { client_id: "", count: maxCount, callback: "JSON_CALLBACK" }
                }).then(
                    function (result) {
                        return result.data.data;
                    });
                return photoResults;
            };
            return photoService;
        }]);
})();