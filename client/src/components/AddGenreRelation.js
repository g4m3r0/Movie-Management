import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers'

const InputGenreRelation = () => {

    const [inputs, setInputs] = useState({});
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();
        console.log(inputs);
        const response = await fetch("http://localhost:5000/genrerelation", {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)});

        const responseJson = await response.json();
        console.log(responseJson);
        handleError(responseJson);

        if(!responseJson.includes("Error:")){
            window.location = "/genrerelation";
        }
      }

      async function getMovies() {
            const res = await fetch("http://localhost:5000/movie");

            const movieArray = await res.json();
            setMovies(movieArray);
            console.log(movieArray);
        }

        async function getGenres() {
            const res = await fetch("http://localhost:5000/genre");
    
            const genreArray = await res.json();
            setGenres(genreArray);
            console.log(genreArray);
        }

        // Runs any time the component is rendered
        useEffect(() => {
            getMovies();
            getGenres();
        }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">Add Genre Relation</h1>
            <form onSubmit={handleSubmit}>
               
                <div className="form-group my-3">
                    <label>Movie</label>
                    <select name="movieId" onChange={handleChange} className="form-select form-select-sm">
                        <option selected disabled>
                            Choose a Movie
                        </option>
                        {movies.map(movie => 
                            <option value={movie.id}>{movie.title}</option>
                            )}
                    </select>
                </div>
                <div className="form-group my-3">
                    <label>Genre </label>
                    <select name="genreId" onChange={handleChange} className="form-select form-select-sm">
                        <option selected disabled>
                            Choose a Genre
                        </option>
                        {genres.map(genre => 
                            <option value={genre.id}>{genre.genre_name}</option>
                            )}
                    </select>
                </div>
                <input className="btn btn-success" type="submit" />
            </form>
        </Fragment>
    );
}

export default InputGenreRelation;