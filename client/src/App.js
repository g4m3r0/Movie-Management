//import logo from './logo.svg';
import React, { Fragment } from 'react';
import './App.css';
import InputTodo from './components/AddPerson';
import ListPersons from './components/ListPersons';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListPersons />
      </div>
    </Fragment>
  );
}

export default App;
