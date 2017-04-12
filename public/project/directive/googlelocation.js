/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .directive("googlelocation", googlelocation);

    function googlelocation() {

        function linkFunc(scope, element, attrs, model){

            var options = {
                types: []
                // componentRestrictions: {}
            };

            scope.gLocation = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gLocation, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
                scope.googlelocationController.saveGLocation(scope.gLocation);
                model.map = scope.map;
                var pos = getPosition(scope.gLocation);
                model.map.center.latitude = pos.latitude;
                model.map.center.longitude = pos.longitude;
                model.map.zoom = 12;
            });

            function getPosition(gLocation) {
                var geoComponents = gLocation.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                return {latitude: latitude, longitude: longitude};
            }
        }

        return {
            require: 'ngModel',
            link: linkFunc,
            controller: googlelocationController,
            controllerAs: "googlelocationController"
        };

        function googlelocationController($rootScope) {
            var vm = this;
            vm.saveGLocation = saveGLocation;


            function saveGLocation(gLocation) {
                $rootScope.gLocation = gLocation;
            }
        }
    }
})();