// import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from './components/NotFoundComponent'
import GetTicketComponent from './components/GetTicketComponent'
import CallCustomerComponent from './components/CallCustomerComponent';
import NextCustomerComponent from './components/NextCustomerComponent';
import TicketComponent from './components/TicketComponent';
import { useState } from 'react';
import { useEffect } from 'react';

const domain = "https://fowl-light-macaque.ngrok-free.app";

const services = [
  "Package Delivery",
  "Tax Payments",
  "Public Administration Payments",
  "Banking Services",
  "Passport Issuance",
  "Telecommunication Services",
]; 

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
  const [ticket, setTicket] = useState("");
  const [currentTicket, setCurrentTicket] = useState(null);

  useEffect(() => {
    console.log("Current Ticket in App:", currentTicket);
  }, [currentTicket]);

  const handleTicket = async (service: string) => {
    // Call the API to get the ticket
    // const ticket = await getTicket(service);
    setTicket(service.replace(/\s+/g, ""));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/get-ticket"
        element={
          <GetTicketComponent
            services={services}
            ticket={ticket}
            handleTicket={handleTicket}
            domain={domain}
          />
        }
      />
      <Route path="/call-customer" element={
        <CallCustomerComponent 
        currentTicket={currentTicket}
        />} 
      />
      <Route path="/next-customer" element={
        <NextCustomerComponent 
        currentTicket={currentTicket}
        setCurrentTicket={setCurrentTicket}
        />} 
      />
      <Route path="/tickets/:ticketId" element={<TicketComponent />} />
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  );
}

export default App;

