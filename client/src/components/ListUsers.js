import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './Helpers';
import env from "react-dotenv";

const ListUsers = () => {

    const [users, setUsers] = useState([]);

    async function getUsers() {
        const res = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/user");

        const usersArray = await res.json();
        setUsers(usersArray);
        console.log(usersArray);
    }

    async function deleteUser(user_name){
        try {

            // send request to the backend to delete the record
            const response = await fetch("http://" + env.SERVER_HOST + ":" + env.SERVER_PORT + "/user/" + user_name, {
                method: "DELETE"
            });

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);

            // remove item from the table
            if(!responseJson.includes("Error:")){
                setUsers(users.filter(users => users.user_name !== user_name));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Users</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Email</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user.user_name}>
                            <td>{user.user_name}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.birthday}</td>
                            <td>{user.sex}</td>
                            <td>{user.email}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteUser(user.user_name)}>Delete</button></td>

                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListUsers;