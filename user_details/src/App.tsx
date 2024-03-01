import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import UserAddress from "./components/UserAddress";
import GeoLocation from "./components/GeoLocation";

import UserContextProvider from "./GlobalContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserDetails />}></Route>
          <Route path="/user" element={<UserAddress />}></Route>
          <Route path="/user/geo" element={<GeoLocation />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
