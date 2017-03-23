/**
 * Created by harsh on 3/23/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "3c46a95f7012686cb4c76cb2ffa96f21";
        var secret = "fcf33394729a197b";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        var api = {
            "searchPhotos": searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();