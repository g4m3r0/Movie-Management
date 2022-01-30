import React, { Component } from "react";
import ListSuggestions from "../components/ListSuggestions";

class Suggest extends Component {
  render() {
    return (
      <div className="container">
        <ListSuggestions />
      </div>
    );
  }
}
 
export default Suggest;