import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignUp } from './pages/SignUp';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
