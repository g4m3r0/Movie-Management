import React, { Fragment, useState, useEffect } from "react";
import { handleError } from './HandleError'
import EditPerson from "./EditPerson";

const ListPersons = () => {

    const [persons, setPersons] = useState([]);

    async function getPersons() {
        const res = await fetch("http://localhost:5000/person");

        const personArray = await res.json();
        setPersons(personArray);
        console.log(personArray);
    }

    async function deletePerson(id){
        try {

            // send request to the backend to delete the record
            const response = await fetch(`http://localhost:5000/person/${id}`, {
                method: "DELETE"
            });

            // remove item from the table
            setPersons(persons.filter(person => person.id != id));

            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Runs any time the component is rendered
    useEffect(() => {
        getPersons();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Person</h1>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Sex</th>
                    <th scope="col">CV</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    persons.map(person => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{person.birthday}</td>
                            <td>{person.sex_as_expression}</td>
                            <td>{person.cv}</td>
                            <td>{person.roles}</td>
                            <td><EditPerson person={person} /></td>
                            <td><button className="btn btn-danger" onClick={() => deletePerson(person.id)}>Delete</button></td>

                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListPersons;