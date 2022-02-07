import React, { Component } from "react";
import ListRoles from "../components/ListRoles";
import InputRole from "../components/AddRole";

class Role extends Component {
  render() {
    return (
      <div className="container">
        <InputRole />
        <ListRoles />
      </div>
    );
  }
}
 
export default Role;