// import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "./API";
import NotFoundComponent from "./components/NotFoundComponent";
import GetTicketComponent from "./components/GetTicketComponent";
import TicketComponent from "./components/TicketComponent";
import { useEffect, useState } from "react";
import Service from "./model/Service";

const domain = "https://edbc-2001-b07-ac9-a10b-2521-b9c8-6006-6670.ngrok-free.app";

/*
const services = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
]; // Example services
*/
function App() {
  const [ticket, setTicket] = useState("");
  const [waitingTime, setWaitingTime] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  
  useEffect(() => {
    API.getAllServices()
    .then((services) => setServices(
      services.map((service => new Service(service.serviceId, service.serviceName)))
    ));
  } , []);

  const handleTicket = async (service: string) => {
    const ticketResponse = await API.getTicket(service);
    setTicket(String(ticketResponse.ticketId));
    setWaitingTime(String(ticketResponse.waitingTime));
  };

  return (
    <Routes>
      <Route
        path="/get-ticket"
        element={
          <GetTicketComponent
            services={services}
            ticket={ticket}
            waitingTime={waitingTime}
            handleTicket={handleTicket}
            domain={domain}
          />
        }
      />
      <Route path="*" element={<NotFoundComponent />} />
      <Route path="/tickets/:ticketId" element={
        <TicketComponent ticketId={ticket} waitingTime={waitingTime}
          />
          } />
    </Routes>
  );
}

export default App;