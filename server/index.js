// Read configuration from .env file
require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT || 5000;
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes //

var person = require('./routes/person');
var movie = require('./routes/movie');
var rating = require('./routes/rating');
var suggest = require('./routes/suggest');

// Film Related Person
app.post('/person', person.add);
app.get('/person', person.get);
app.get('/person/:id', person.getSingle);
app.put('/person/:id', person.update);
app.delete('/person/:id', person.delete);


// Movie
app.post('/movie', movie.add);
app.get('/movie', movie.get);
app.get('/movie/:id', movie.getSingle);
app.put('/movie/:id', movie.update);
app.delete('/movie/:id', movie.delete);

// Rating
app.post('/rating', rating.add);
app.get('/rating', rating.get);
app.get('/rating/:id', rating.getSingle);
app.put('/rating/:id', rating.update);
app.delete('/rating/:id', rating.delete);

// Suggest
app.get('/suggest', suggest.get);

// Add genre [mm_genre]
app.post("/genre", async(req, res) => {
    try {
        const { genreName } = req.body;
        const newGenre = await pool.query(
            "Call create_or_update_genre(null, $1)", [genreName]);

        res.json("Genre was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Update genre
app.put("/genre/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { genreName } = req.body;

        const updateGenre = await pool.query(
            "Call create_or_update_genre($1, $2)", [id, genreName]);

        res.json("Rating was updated!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Get genres
app.get("/genre", async(req, res) => {
    try {
        const allGenres = await pool.query("SELECT * FROM mm_genre ORDER BY genre_name ASC");
        res.json(allGenres.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Delete genre
app.delete("/genre/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenre = await pool.query("DELETE FROM mm_genre WHERE id = $1", [id]);

        res.json("Genre was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Add genre relation
app.post("/genrerelation", async(req, res) => {
    try {
        const { movieId, genreId } = req.body;
        const newRole = await pool.query(
            "Call create_or_update_genre_relation(null, $1, $2)", [movieId, genreId]);

        res.json("Genre relation added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});


// Get genre relations
app.get("/genrerelation", async(req, res) => {
    try {
        const allGenreRelations = await pool.query("SELECT * FROM genre_view");
        res.json(allGenreRelations.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Delete genre relation
app.delete("/genrerelation/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenreRelation = await pool.query("DELETE FROM mm_genre_relation WHERE id = $1", [id]);

        res.json("Genre Relation was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});


// Add role
app.post("/role", async(req, res) => {
    try {
        const { personId, movieId, role_type } = req.body;
        const newRole = await pool.query(
            "Call create_or_update_role(null, $1, $2, $3)", [personId, movieId, role_type]);

        res.json("Role was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Get roles
app.get("/role", async(req, res) => {
    try {
        const allGenres = await pool.query("SELECT * FROM role_view");

        res.json(allGenres.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Get roles distinct
app.get("/role/distinct", async(req, res) => {
    try {
        const allDistinctRoles = await pool.query("SELECT DISTINCT role_type FROM role_view");

        res.json(allDistinctRoles.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Delete role
app.delete("/role/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteGenre = await pool.query("DELETE FROM mm_role WHERE id = $1", [id]);

        res.json("Role was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Get users
app.get("/user", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_view");

        res.json(allUsers.rows);
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

// Add user
app.post("/user", async(req, res) => {
    try {
        console.log(req.body);
        const { username, firstname, lastname, birthday, sex, email } = req.body;
        const newUser = await pool.query("INSERT INTO mm_user (user_name, last_name, first_name, birthday, sex, email) VALUES ($1, $2, $3, $4, $5, $6)", [username, firstname, lastname, birthday, sex, email]);

        res.json("User was added!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});


// Delete user
app.delete("/user/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM mm_user WHERE id = $1", [id]);

        res.json("User was deleted!");
    } catch (error) {
        res.json("Error:" + error.message);
        console.error(error);
    }
});

app.listen(port, () => {
    console.log("Server has started listening on port " + port);
});