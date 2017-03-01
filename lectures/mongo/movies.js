/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app) {

    app.post('/api/lectures/movie', createMovie);

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
                    res.sendStatus(200).json(movie);
                },
                function (error) {
                    res.sendStatus(404);
                }
            )

    }


    // MovieModel.create({title: 'The Abyss'});
    // MovieModel.create({title: 'Terminator'});

    var promise = MovieModel.find();
    promise.then(
        function (movies) {
            console.log(movies);
        },
        function (error) {

        }
    )
};
