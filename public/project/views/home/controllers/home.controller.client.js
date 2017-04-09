/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("HomeController", HomeController);

    function HomeController(uiGmapGoogleMapApi) {

        var vm = this;

        function init() {
            vm.map = { center: { latitude: 42.34, longitude: -71.09 }, zoom: 12 };

            uiGmapGoogleMapApi.then(function(maps) {

                /*var options = {
                    enableHighAccuracy: true
                };

                navigator.geolocation.getCurrentPosition(function(pos) {
                        vm.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        vm.map = { center: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }, zoom: 8 };
                        console.log(JSON.stringify(vm.position));
                    },
                    function(error) {
                        alert('Unable to get location: ' + error.message);
                    }, options);*/
            });
        }
        init();
    }
})();