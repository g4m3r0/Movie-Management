import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {
    /* <EditTodo person={person}/> */
    
    const editText = async (id) => {
        try {
            const body = {description};

            const res = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        console.log(res);
        window.location = "/";

        } catch (error) {
            console.log(error.message);
        }
    }

    const [description, setDescription] = useState(todo.description);

    return (
        <Fragment> 
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            <div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={e => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e => setDescription(todo.description)}></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => setDescription(todo.description)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => editText(todo.todo_id)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;