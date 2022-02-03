import React, { Component } from "react";

import ListGenres from "../components/ListGenres";
import InputGenre from "../components/AddGenre";

class Genre extends Component {
  render() {
    return (
      <div className="container">
        <ListGenres />
        <InputGenre />
      </div>
    );
  }
}
 
export default Genre;