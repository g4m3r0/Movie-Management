// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add movie
exports.add = async(req, res) => {
    try {
        const { parentMovie, title, releaseYear, requiredAge, productionCountry } = req.body;
        const newMovie = await pool.query("CALL create_or_update_movie(null, $1, $2, $3, $4, $5)", [parentMovie, title, releaseYear, requiredAge, productionCountry]);

        res.json("Movie was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get movies
exports.get = async(req, res) => {
    try {
        const allMovies = await pool.query("SELECT * FROM movie_view");

        res.json(allMovies.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

exports.getSingle = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await pool.query("SELECT * FROM movie_view WHERE id = $1", [id]);

        res.json(movie.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Update movie
exports.update = async(req, res) => {
    try {
        const { id } = req.params;
        const { parentMovie, title, releaseYear, requiredAge, productionCountry } = req.body;
        console.log(req.body);
        const updateMovie = await pool.query("CALL create_or_update_movie($1, $2, $3, $4, $5, $6)", [id, parentMovie, title, releaseYear, requiredAge, productionCountry]);

        res.json("Movie was updated!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete movie
exports.delete = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteMovie = await pool.query("DELETE FROM mm_movie WHERE id = $1", [id]);

        res.json("Movie was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};