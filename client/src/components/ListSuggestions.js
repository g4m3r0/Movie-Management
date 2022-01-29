import React, { Fragment, useState, useEffect } from "react";

// todo: everything

const ListSuggestions = () => {

    const [ruggestions, setSuggestions] = useState([]);

    async function getSuggestions() {
        const res = await fetch("http://localhost:5000/suggest");

        const suggestArray = await res.json();
        setSuggestions(suggestArray);
        console.log(suggestArray);
    }

    async function deleteRating(id){
        try {

            // send request to the backend to delete the record
            const res = await fetch(`http://localhost:5000/suggest/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setSuggestions(ruggestions.filter(suggest => suggest.id != id));
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Suggestions</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Movie ID</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    ruggestions.map(suggest => (
                        <tr key={suggest.id}>
                            <td>{suggest.id}</td>
                            <td>{suggest.user_id}</td>
                            <td>{suggest.movie_id}</td>
                            <td>{suggest.suggest}</td>
                            <td>Todo Edit Button</td>
                            <td><button className="btn btn-danger" onClick={() => deleteRating(suggest.id)}>Delete</button></td>

                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListSuggestions;