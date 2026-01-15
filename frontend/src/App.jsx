import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import List from './pages/list';
import Layout from './components/layout';
import Reminders from './pages/reminders';

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path="sublist/:subListId" element={<Reminders />} />
      </Route>
    </Routes>
  );
}