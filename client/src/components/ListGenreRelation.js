import React, { Fragment, useState, useEffect } from "react";

const ListGenreRelation = () => {

    const [genres, setGenres] = useState([]);

    async function getGenres() {
        const res = await fetch("http://localhost:5000/genrerelation");

        const genreArray = await res.json();
        setGenres(genreArray);
        console.log(genreArray);
    }

    async function deleteGenre(id){
        try {

            // send request to the backend to delete the record
            const res = await fetch(`http://localhost:5000/genrerelation/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setGenres(genres.filter(genre => genre.id != id));
            console.log(res);
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
            <h1 className="text-center my-5">List Genre Relations</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Genre Name</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.movie}</td>
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

export default ListGenreRelation;