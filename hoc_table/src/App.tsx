import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserData from './components/UserData';
import UserDetails from './components/UserDetails';

const App:React.FC=()=> {
  return (
    <div className="App">
      <UserData/>
     <UserDetails/>
    </div>
  );
}

export default App;
