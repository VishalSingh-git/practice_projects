
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CountryForm from "./components/CountryForm";
import CountryInfo from "./components/CountryInfo";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryForm />}></Route>
        <Route path="/country_info" element={<CountryInfo />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
