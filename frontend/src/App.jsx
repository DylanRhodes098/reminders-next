import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import List from './components/sideNav2';
import Home from './pages/home';
import Settings from './pages/settings';
import User from './pages/user';
import Layout from './components/layout';
import Reminders from './pages/reminders';
import Agent from './pages/agent';

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="user" element={<User />} />
        <Route path="sublist/:subListId" element={<Reminders />} />
        <Route path="agent" element={<Agent />} />
      </Route>
    </Routes>
  );
}