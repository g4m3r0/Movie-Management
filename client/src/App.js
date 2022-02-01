import React, { Fragment, Component } from 'react';
import  { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Rating from './pages/Rating';
import Suggest from './pages/Suggest';
import Person from './pages/Person';


class App extends Component {
  render() {
  return (
      <div>
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/movie" element={<Movie />}/>
            <Route path="/rating" element={<Rating />}/>
            <Route path="/suggest" element={<Suggest />}/>
            <Route path="/person" element={<Person />}/>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}
}

export default App;
