import React, { Component } from "react";
import InputPerson from '../components/AddPerson';
import ListPersons from '../components/ListPersons';

class Person extends Component {
  render() {
    return (
      <div className="container">
        <ListPersons />
        <InputPerson />
      </div>
    );
  }
}
 
export default Person;