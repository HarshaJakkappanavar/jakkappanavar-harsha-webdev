/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app) {

    app.post('/api/lectures/movie', createMovie);
    app.get('/api/lectures/movie', findAllMovies);
    app.delete('/api/lectures/movie/:movieId', deleteMovie);
    app.get('/api/lectures/movie/:movieId', findMovieById);
    app.put('/api/lectures/movie/:movieId', updateMovie);

    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: String,
        director: String,
        rating: String,
        created: Date
    }, {collection: 'movie'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    function createMovie(req, res) {
        var movie = req.body;
        MovieModel
            .create(movie)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(404);
                }
            )

    }

    function findAllMovies(req, res) {
        MovieModel
            .find()
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function deleteMovie(req, res) {
        var movieId = req.params.movieId;

        MovieModel
            .remove({_id: movieId})
            .then(
                function (movie) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findMovieById(req, res) {
        var movieId = req.params.movieId;
        // MovieModel
        //     .find({_id: movieId});
        MovieModel
            .findById({_id: movieId})
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateMovie(req, res) {
        var movieId = req.params.movieId;
        var movie = req.body;

        MovieModel
            .update({_id: movieId}, {$set: {title: movie.title}})
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

};
