import React from 'react';


//import SignUpAsteroid from './components/SignUpAsteroid';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { SignUpAsteroid } from './components/SignUpAsteroid';
import AsteroidIdInfo from './components/AsteroidIdInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<SignUpAsteroid/>}></Route>
        <Route path="/asteroid_id_info" element={<AsteroidIdInfo/>}></Route>
      </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
