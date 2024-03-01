import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlotsForm from "./pages/SlotsForm/SlotsForm";
import AllSlotsPage from "./pages/AllSlots/AllSlotsPage";
import PaymentDeallocation from "./pages/Payment&Deallocation/PaymentDeallocation";
import GlobalContextProvider from "./component/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SlotsForm />}></Route>
          <Route path="/allSlots" element={<AllSlotsPage />}></Route>
          <Route
            path="/payment_deallocation"
            element={<PaymentDeallocation />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
