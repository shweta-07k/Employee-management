import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Dashoard from './pages/admin/Dashoard'
import Login from './pages/admin/Login'
import Register from './pages/admin/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmployeeDash from './pages/admin/employee/EmployeeDash'

export default function App() {
  return <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Register />}></Route>
      <Route path='/admin/dashboard' element={<Dashoard />}></Route>
      <Route path='/employee/dashboard' element={<EmployeeDash />}></Route>

    </Routes>
  </BrowserRouter>
}
