import React from "react";

import "./App.css";
import SideNavbar from "./components/SideNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBarHeader from "./components/AppBarHeader";
import Navbar from "./components/Navbar";
import Account from "./pages/Account/Account";
import Permission from "./pages/Account/Permission";
import Setting from "./pages/Account/Setting";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import ViewProfile from "./pages/Profile/ViewProfile";
import User from "./pages/Users/User";
import Adduser from "./pages/Users/Adduser";
import EditUser from "./pages/Users/EditUser";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />

            <Route path="/account" >
              <Route index element={<Account />} />
              <Route path="permission" element={<Permission />} />
              <Route path="setting" element={<Setting />} />
            </Route>

            {/* <Route path="/profile" element={<Profile />}>
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="viewProfile" element={<ViewProfile />} />
            </Route> */}
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="viewProfile" element={<ViewProfile />} />
            </Route>

            <Route path="/users" >
              <Route index element={<User />}/>
              <Route path="addUser" element={<Adduser />} />
              <Route path="editUser" element={<EditUser />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
