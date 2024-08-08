import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, SignUp } from './components/Auth';
import "./App.css";
import Dashboard from './components/Dashboard/Dashboard';
import { CreateSkillForm } from './components/Dashboard/Cards';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path='/admin/Dashboard' element={<Dashboard/>} />
        <Route path='/admin/Dashboard/card' element={<CreateSkillForm/>} />
      </Routes>
    </Router>
  );
}

export default App;