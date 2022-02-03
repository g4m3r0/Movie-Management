import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers'

import EditMovie from "./EditMovie";
import EditRating from "./RateMovie";

const ListMovies = () => {

    const [movies, setMovies] = useState([]);

    async function getMovies() {
        const res = await fetch("http://localhost:5000/movie");

        const movieArray = await res.json();
        setMovies(movieArray);
        console.log(movieArray);
    }

    async function deleteMovie(id){
        try {

            // send request to the backend to delete the record
            const response = await fetch(`http://localhost:5000/movie/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setMovies(movies.filter(movie => movie.id != id));

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Movies</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Parent Movie</th>
                    <th scope="col">Title</th>
                    <th scope="col">Release Year</th>
                    <th scope="col">Required Age</th>
                    <th scope="col">Production Country</th>
                    <th scope="col">Average Rating</th>
                    <th scope="col">Persons</th>
                    <th scope="col">Genres</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    movies.map(movie => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.parent_movie}</td>
                            <td>{movie.title}</td>
                            <td>{movie.release_year}</td>
                            <td>{movie.required_age}</td>
                            <td>{movie.production_country}</td>
                            <td>{movie.average_rating}</td>
                            <td>{movie.persons}</td>
                            <td>{movie.genres}</td>
                            <td><EditRating movie={movie} /></td>
                            <td><EditMovie movie={movie} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteMovie(movie.id)}>Delete</button></td>

                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListMovies;