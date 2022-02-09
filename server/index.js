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
var genre = require('./routes/genre');
var genrerelation = require('./routes/genrerelation');
var role = require('./routes/role');

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

//Genre
app.post('/genre', genre.add);
app.get('/genre', genre.get);
app.put('/genre/:id', genre.update);
app.delete('/genre/:id', genre.delete);

// Genre Relation
app.post('/genrerelation', genrerelation.add);
app.get('/genrerelation', genrerelation.get);
app.delete('/genrerelation/:id', genrerelation.delete);

// Role
app.post('/role', role.add);
app.get('/role', role.get);
app.get('/role/distinct', role.getDistinct);
app.delete('/role/:id', role.delete);

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