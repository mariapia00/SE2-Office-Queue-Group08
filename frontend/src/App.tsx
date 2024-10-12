// import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundComponent from "./components/NotFoundComponent";
import GetTicketComponent from "./components/GetTicketComponent";
import TicketComponent from "./components/TicketComponent";
import { useState } from "react";

const services = [
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
  "Service 6",
  "Service 7",
  "Service 8",
  "Service 9",
  "Service 10",
  "Service 11",
  "Service 12",
  "Service 13"
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
          />
        }
      />
      <Route path="*" element={<NotFoundComponent />} />
      <Route
        path="/tickets/:ticketId"
        element={<TicketComponent />}
      />
    </Routes>
  );
}

export default App;
