// import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from "./components/NotFoundComponent";
import GetTicketComponent from "./components/GetTicketComponent";
import TicketComponent from "./components/TicketComponent";
import { useState } from "react";

const domain = "https://fowl-light-macaque.ngrok-free.app";

const services = [
  "Package Delivery",
  "Tax Payments",
  "Public Administration Payments",
  "Banking Services",
  "Passport Issuance",
  "Telecommunication Services",
]; // Example services

function App() {
  const [ticket, setTicket] = useState("");

  const handleTicket = async (service: string) => {
    // Call the API to get the ticket
    // const ticket = await getTicket(service);
    setTicket(service.replace(/\s+/g, ""));
  };

  return (
    <Routes>
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
      <Route path="*" element={<NotFoundComponent />} />
      <Route path="/tickets/:ticketId" element={<TicketComponent />} />
    </Routes>
  );
}

export default App;
