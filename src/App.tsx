import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SignUp } from './pages/SignUp';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
