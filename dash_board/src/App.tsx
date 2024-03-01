import React from "react";

import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainDashboard from "./pages/Dashboard/MainDashboard";
import Buttons from "./components/Bottons/Buttons";
import GridSystem from "./components/GridSystem/GridSystem";
import Panels from "./components/Panels/Panels";
import ExtendedForm from "./forms/ExtendedForms/ExtendedForm";
import RegularForm from "./forms/RegularForms/RegularForm";
import ValidationForm from "./forms/ValidationForms/ValidationForm";
import Maps from "./Maps/Maps";
import ExtendedTables from "./tables/ExtendedTables/ExtendedTables";
import ReactTables from "./tables/ReactTables/ReactTables";
import Setting from "./pages/MyProfile/Settings/Setting";
import MyProfile from "./pages/MyProfile/MyProfile";
import EditProfile from "./pages/MyProfile/EditProfile/EditProfile";
import Home from "./pages/Dashboard/DashboardItems/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDashboard />}>
        <Route index element={<Home />} />

          <Route path="/" element={<Outlet/>}>
            <Route path="myprofile" element={<MyProfile/>}/>
            <Route path="editProfile" element={<EditProfile/>}/>
            <Route path="setting" element={<Setting/>}/>
          </Route>
          <Route path="/" element={<Outlet />}>
            <Route path="buttons" element={<Buttons />} />
            <Route path="gridSystem" element={<GridSystem />} />
            <Route path="panels" element={<Panels />} />
          </Route>
          <Route path="/" element={<Outlet />}>
            <Route path="extendedForms" element={<ExtendedForm />} />
            <Route path="regularForms" element={<RegularForm />} />
            <Route path="validationForms" element={<ValidationForm />} />
          </Route>
          <Route path="/" element={<Outlet/>}>
            <Route path="extendedTables" element={<ExtendedTables/>}/>
            <Route path="reactTables" element={<ReactTables/>}/>
            <Route path="regularTables" element={<ReactTables/>}/>
          </Route>

          <Route path="/" element={<Outlet />}>
            <Route path="maps" element={<Maps />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
