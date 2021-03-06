import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const ListRoles = () => {

    const [roles, setRoles] = useState([]);

    async function getRoles() {
        const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/role");

        const rolesArray = await res.json();
        setRoles(rolesArray);
        console.log(rolesArray);
    }

    async function deleteRoles(id){
        try {

            // send request to the backend to delete the record
            const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/role/" + id, {
                method: "DELETE"
            });

            // remove item from the table
            setRoles(roles.filter(roles => roles.id !== id));

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getRoles();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Roles</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Person</th>
                    <th scope="col">Role Type</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    roles.map(roles => (
                        <tr key={roles.id}>
                            <td>{roles.movie_title}</td>
                            <td>{roles.person}</td>
                            <td>{roles.role_type}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteRoles(roles.id)}>Delete</button></td>

                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListRoles;