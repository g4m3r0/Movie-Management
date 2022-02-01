import React, { Fragment, useState, useEffect } from "react";

// todo: everything

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
        const suggestIdArray = await res.json();

        const {suggest_movie} = suggestIdArray[0];

        const movieRes = await fetch("http://localhost:5000/movie/" + suggest_movie);
        const suggestArray = await movieRes.json();

        setSuggestions(suggestArray);
        console.log(suggestArray);
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Suggested Movie</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Parent Movie</th>
                    <th scope="col">Title</th>
                    <th scope="col">Release Year</th>
                    <th scope="col">Required Age</th>
                    <th scope="col">Production Country</th>
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
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListSuggestions;