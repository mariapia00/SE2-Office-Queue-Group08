// import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from './components/NotFoundComponent'
import GetTicketComponent from './components/GetTicketComponent'
import CallCustomerComponent from './components/CallCustomerComponent'
import NextCustomerComponent from './components/NextCustomerComponent';

const services = ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"]; // Example services

function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mb-4">
        <Link to="/get-ticket" className="btn btn-primary btn-lg m-2">
          Get Ticket
        </Link>
        <Link to="/call-customer" className="btn btn-secondary btn-lg m-2">
          Call Customer
        </Link>
        <Link to="/next-customer" className="btn btn-success btn-lg m-2">
          Next Customer
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get-ticket" element={<GetTicketComponent services={services} />} />
      <Route path="/call-customer" element={<CallCustomerComponent />} />
      <Route path="/next-customer" element={<NextCustomerComponent />} />
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  );
}

export default App;

