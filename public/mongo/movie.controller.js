/**
 * Created by harsh on 2/28/2017.
 */

(function () {
    angular
        .module("MovieApp", [])
        .controller("MovieController", MovieController);

    function MovieController($http) {
        var vm = this;

        vm.createMovie = createMovie;

        function init() {
            $http
                .get('/api/lectures/movie')
                .then(renderMovies);
        }

        function createMovie(movie) {
            $http.post('/api/lectures/movie', movie);
        }
    }
})();
