// Read configuration from .env file
require('dotenv').config();

const pool = require("./../db");

// Add rating
exports.add = async(req, res) => {
    try {
        const { username, movieId, rating } = req.body;
        const newRating = await pool.query(
            "Call create_or_update_rating(null, $1, $2, $3)", [movieId, rating, username]);

        res.json("Rating was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Get rating
exports.add = async(req, res) => {
    try {
        const allRatings = await pool.query("SELECT * FROM rating_view");

        res.json(allRatings.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

exports.add = async(req, res) => {
    try {
        const { id } = req.params;
        const rating = await pool.query("SELECT * FROM rating_view WHERE id = $1", [id]);

        res.json(rating.rows);

    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Update rating
exports.add = async(req, res) => {
    try {
        const { id } = req.params;
        const { username, movieId, rating } = req.body;
        const updateRating = await pool.query(
            "Call create_or_update_rating($1, $2, $3, $4)", [id, movieId, rating, username]);

        res.json("Rating was updated!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};

// Delete rating
exports.add = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteRating = await pool.query("DELETE FROM mm_rating WHERE id = $1", [id]);

        res.json("Rating was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
};