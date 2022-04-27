import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Viewport } from './components/Viewport/Viewport';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchBarContext';
import { ThemesProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';

export const App: React.FC = () => {
  return (
    <ThemesProvider>
      <AuthProvider>
        <SearchProvider>
          <Viewport>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </Viewport>
        </SearchProvider>
      </AuthProvider>
    </ThemesProvider>
  );
};
