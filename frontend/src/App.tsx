// import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from './components/NotFoundComponent'
import GetTicketComponent from './components/GetTicketComponent'

function App() {

  return (
    <Routes>
      <Route path="/get-ticket" element={<GetTicketComponent />} />
      <Route path ="*" element={<NotFoundComponent />} />
    </Routes>

  )
}

export default App
