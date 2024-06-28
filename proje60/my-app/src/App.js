// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Payment from './components/Payment';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
