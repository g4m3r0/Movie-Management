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
        //const suggestIdArray = await res.json();
        //const {suggest_movie} = suggestIdArray[0];

        /*if(!suggest_movie){
            // User not found
            const message = "Error: User not found!";
            console.log(message);
            handleError(message);
            window.location = "/";
        }*/

        //const movieRes = await fetch("http://localhost:5000/movie/" + suggest_movie);
        //const suggestArray = await movieRes.json();

        //setSuggestions(suggestArray);
        console.log(suggestionArray);
        setSuggestions(suggestionArray);
        //console.log(suggestArray);
        //handleError(suggestArray);
        
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