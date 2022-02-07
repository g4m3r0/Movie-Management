import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const ListGenre = () => {

    const [genres, setGenres] = useState([]);

    async function getGenres() {
        const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/genre");

        const genreArray = await res.json();
        setGenres(genreArray);
        console.log(genreArray);
    }

    async function deleteGenre(id){
        try {
            // send request to the backend to delete the record
            const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/genre/" + id, {
                method: "DELETE"
            });

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        
            if(!responseJson.includes("Error:")){
                window.location = "/genre";
            }
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
                    <th scope="col">Genre Name</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    genres.map(genre => (
                        <tr key={genre.id}>
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