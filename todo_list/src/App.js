import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";
import Error from "./Error";
const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<InputTodo/>}></Route>
      <Route path="/list-todo"  element={<ListTodo/>}></Route>
      <Route path="*"  element={<Error/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
