import React, { Fragment, useState, useEffect } from "react";

const ListGenre = () => {

    const [genres, setGenres] = useState([]);

    async function getGenres() {
        const res = await fetch("http://localhost:5000/genre");

        const genreArray = await res.json();
        setGenres(genreArray);
        console.log(genreArray);
    }

    async function deleteGenre(id){
        try {
            // send request to the backend to delete the record
            const res = await fetch(`http://localhost:5000/genre/${id}`, {
                method: "DELETE"
            });

            console.log(res);
            window.location = "/genre";
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getGenres();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Genres</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Genre Name</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.id}</td>
                            <td>{genre.genre_name}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteGenre(genre.id)}>Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListGenre;