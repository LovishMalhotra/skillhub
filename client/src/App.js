import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, SignUp } from './components/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import { CreateSkillForm } from './components/Dashboard/Cards';
import "./App.css";
import ProfilePage from './components/User/UserProfile';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Editlogic } from './components/User/EditProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path='/admin/Dashboard' element={<Dashboard/>} />
        <Route path='/admin/Dashboard/card' element={<CreateSkillForm/>} />
        <Route path='/user/userProfile' element={<ProfilePage/>} />
        <Route path='/user/edit' element={<Editlogic/>} />
      </Routes>
    </Router>
  );
}

export default App;