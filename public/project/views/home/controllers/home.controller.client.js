/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, uiGmapGoogleMapApi) {

        var vm = this;

        function init() {


            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            uiGmapGoogleMapApi.then(function(maps) {

                /*var options = {
                    enableHighAccuracy: true
                };

                navigator.geolocation.getCurrentPosition(function(pos) {

                    $scope.map = {
                        center:
                            {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            },
                        zoom:8
                    };
                 },
                 function(error) {
                 alert('Unable to get location: ' + error.message);
                 }, options);
                 $scope.markers = [];
                 $scope.locations = [];*/
                $scope.maps = maps;
            });
        }
        init();
    }
})();