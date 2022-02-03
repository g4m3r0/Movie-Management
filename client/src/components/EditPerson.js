import React, { Fragment, useState } from "react";
import { handleError } from './Helpers'

const EditPerson = ({person}) => {
    const editPerson = async () => {
        try {
            const response = await fetch("http://localhost:5000/person/" + person.id, {method: "PUT", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)});
    
            const responseJson = await response.json();
            console.log(responseJson);
            handleError(responseJson);
        
            if(!responseJson.includes("Error:")){
                window.location = "/person";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#editPerson${person.id}`}>
            Edit
            </button>

            <div className="modal fade" id={`editPerson${person.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Person (ID: {person.id})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group my-3">
                                <label>Firstname</label>
                                <input type="text" name="firstName" className="form-control" placeholder={person.first_name} value={inputs.first_name} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Lastname</label>
                                <input type="text" name="lastName" className="form-control" placeholder={person.last_name} value={inputs.last_name} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Birthday</label>
                                <input type="text" name="birthday" className="form-control" placeholder={person.birthday} value={inputs.birthday} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>Sex</label>
                                <input type="number" name="sex" className="form-control" placeholder={person.sex} value={inputs.sex} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-3">
                                <label>CV</label>
                                <input type="text" name="cv" className="form-control" placeholder={person.cv} value={inputs.cv} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => editPerson()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditPerson;