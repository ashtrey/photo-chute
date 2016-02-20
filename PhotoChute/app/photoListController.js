(function() {
    "user strict";

    angular.module("photoApp")
        .controller("photoListController", ["instagramService", function photoListController(photoService) {
            var vm = this;

            vm.photos = [];
            vm.hasLoadedRemotely = true;
            vm.errorMessage = "";
            vm.isBusy = false;
            vm.maxCount = 50;
            vm.actualCount = 0;

            vm.loadFromService = function () {
                vm.errorMessage = "";
                vm.isBusy = true;
                vm.hasLoadedRemotely = true;
                vm.actualCount = 0;

                photoService.getPhotos(vm.maxCount)
                    .then(function (list) {
                        localStorage.setItem("photoList", JSON.stringify(list));
                        vm.photos = list;
                        vm.actualCount = vm.photos.length;
                    }, function (result) {
                        vm.errorMessage = "Request failed" + (result.status ? ": " + result.status : "");
                    })
                    .finally(function () {
                        vm.isBusy = false;
                    });
            };

            var localList = localStorage.getItem("photoList");
            if (localList) {
                vm.hasLoadedRemotely = false;
                vm.photos = angular.fromJson(localList);
                vm.actualCount = vm.photos.length;
            } else {
                vm.loadFromService();
            }

            vm.getAuthorName = function(photo) {
                return photo.user.full_name === "" ? "Anonymous" : photo.user.full_name;
            };
        }]);
})();