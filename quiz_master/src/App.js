import React from 'react';

import Quiz from './Quiz';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuizResult from './QuizResult';
import ErrorPage from './ErrorPage';
function App() {
  return (
    <div >


   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Quiz/>}></Route>
    <Route path='/quiz_result' element={<QuizResult/>}></Route>
    <Route path='*' element={<ErrorPage/>}></Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
