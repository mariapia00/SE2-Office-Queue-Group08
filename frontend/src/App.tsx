import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "./API";
import NotFoundComponent from "./components/NotFoundComponent";
import GetTicketComponent from "./components/GetTicketComponent";
import TicketComponent from "./components/TicketComponent";
import { useEffect, useState } from "react";
import Service from "./model/Service";

const domain = "https://fowl-light-macaque.ngrok-free.app";

function App() {
  const [ticket, setTicket] = useState("");
  const [waitingTime, setWaitingTime] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    API.getAllServices().then((services) =>
      setServices(
        services.map(
          (service) => new Service(service.serviceId, service.serviceName)
        )
      )
    );
  }, []);

  const handleTicket = async (serviceId: string) => {
    try {
      const ticketData = await API.getTicket(serviceId);
      setTicket(String(ticketData.ticketId));
      setWaitingTime(String(ticketData.waitingTime));
    } catch (error) {
      console.error("Failed to get ticket:", error);
    }
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
      <Route
        path="/tickets/:ticketId"
        element={<TicketComponent />}
      />
    </Routes>
  );
}

export default App;
