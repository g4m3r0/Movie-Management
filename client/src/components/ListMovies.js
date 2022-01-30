import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo"; //todo: edit functionallity using modal

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
            const res = await fetch(`http://localhost:5000/movie/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setMovies(movies.filter(movie => movie.id != id));
            console.log(res);

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
                            <td>Todo Edit Button</td>
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