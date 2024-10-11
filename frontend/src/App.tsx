// import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from './components/NotFoundComponent'
import GetTicketComponent from './components/GetTicketComponent'
import CallCustomerComponent from './components/CallCustomerComponent'

const services = ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"]; // Example services

function App() {

  return (
    <Routes>
      <Route path="/get-ticket" element={<GetTicketComponent services={services}/>} />
      <Route path="/call-customer" element={<CallCustomerComponent />} />
      <Route path ="*" element={<NotFoundComponent />} />
    </Routes>

  )
}

export default App
