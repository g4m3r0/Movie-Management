import React, { Component } from "react";

import ListUsers from "../components/ListUsers";
import InputUser from "../components/AddUser";

class User extends Component {
  render() {
    return (
      <div className="container">
        <InputUser />
        <ListUsers />
      </div>
    );
  }
}
 
export default User;