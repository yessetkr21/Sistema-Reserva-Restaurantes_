import React from 'react';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup.jsx';
import Home from './Home.jsx'; 
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


