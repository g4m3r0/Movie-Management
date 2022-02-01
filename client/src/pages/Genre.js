import React, { Component } from "react";

import ListGenres from "../components/ListGenres";
import InputGenre from "../components/AddGenre";

class Suggest extends Component {
  render() {
    return (
      <div className="container">
        <ListGenres />
        <InputGenre />
      </div>
    );
  }
}
 
export default Suggest;