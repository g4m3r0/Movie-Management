import React, { Fragment, useState, useEffect } from "react";
import { checkLogin } from './Helpers'

const SetUser = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async event => {
        event.preventDefault();

        if(inputs.userName){
            window.sessionStorage.setItem('username', inputs.userName);
            checkUsername();
        } 
      }

      const checkUsername = () => {
            if(checkLogin()){
                document.getElementById('login').innerHTML = `Logged in as ${window.sessionStorage.getItem('username')}`;
            } else {
                document.getElementById('login').innerHTML = 'Login';
            }
        }

        const logout = () => {
            window.sessionStorage.removeItem('username');
            document.getElementById('login').innerHTML = 'Login';
            console.log('Logged out!');
            //window.location = '/';
        }

        useEffect(() => {
            checkUsername();
          });

    return (
        <Fragment>
            <h1 id="login" className="text-center my-5">Login</h1>
            <form className="align-baseline">
                <div className="form-group my-3">
                    <label>Username</label>
                    <input 
                        className="form-control"
                        type="text" 
                        name="userName" 
                        value={inputs.userName || ""} 
                        onChange={handleChange}
                    />
                </div>
                <input className="btn btn-success" onClick={handleSubmit} type="submit" value="Login"/>
                <button className="btn btn-danger mx-3" onClick={logout}>Logout</button>
            </form>
        </Fragment>
    );
}

export default SetUser;