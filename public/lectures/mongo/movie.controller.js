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
        vm.deleteMovie = deleteMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;

        function init() {
            findAllMovies();
        }
        init();

        function findAllMovies() {
            $http
                .get('/api/lectures/movie')
                .success(renderMovies);
        }
        function createMovie(movie) {
            $http
                .post('/api/lectures/movie', movie)
                .success(findAllMovies);
        }

        function renderMovies(movies) {
            vm.movies = movies;
        }

        function deleteMovie(movieId) {
            $http
                .delete('/api/lectures/movie/' + movieId)
                .success(findAllMovies);
        }

        function selectMovie(movieId) {
            $http
                .get('/api/lectures/movie/' + movieId)
                .success(renderMovie);
        }

        function renderMovie(movie) {
            vm.movie = movie;
        }

        function updateMovie(movie) {
            $http
                .put('/api/lectures/movie/' + movie._id, movie)
                .success(findAllMovies);
        }
    }
})();
