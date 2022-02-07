import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers'

const ListSuggestions = () => {

    const [movies, setSuggestions] = useState([]);

    async function getSuggestions() {

        var tmpUserName = window.sessionStorage.getItem('username');
        console.log(`Username: ${tmpUserName}`);
        if (tmpUserName == null || tmpUserName == undefined || tmpUserName == 'undefined') {
            alert('Not logged in! Please login first!');
            window.location = "/";
        }

        const res = await fetch("http://localhost:5000/suggest/" + tmpUserName);
        const suggestionArray = await res.json();
        
        setSuggestions(suggestionArray);
        handleError(suggestionArray);
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">Suggestions for {window.sessionStorage.getItem('username')}</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Genres</th>
                    <th scope="col">Persons</th>
                    <th scope="col">User Score</th>
                    <th scope="col">Decision</th>
                </tr>
            </thead>
            <tbody>
                {

                    movies.map(movie => (
                        <tr key={movie.movie_id}>
                            <td>{movie.movie}</td>
                            <td>{movie.genres}</td>
                            <td>{movie.persons}</td>
                            <td>{Math.round(movie.user_score)}%</td>
                            <td>{movie.decision}</td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListSuggestions;
