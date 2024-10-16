import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const CallCustomer = ({ currentTicket }) => {
  const [counters, setCounters] = useState([
    { counterId: 1, serviceName: null, ticketId: null },
    { counterId: 2, serviceName: null, ticketId: null },
    { counterId: 3, serviceName: null, ticketId: null },
  ]);

  useEffect(() => {
    if (currentTicket) {
      // Aggiorna il counter corrispondente al ticket corrente
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.counterId === currentTicket.counterId
            ? {
                ...counter,
                serviceName: currentTicket.serviceName,
                ticketId: currentTicket.ticketId,
              }
            : counter
        )
      );
    }
  }, [currentTicket]);

  return (
    <div className="container mt-4">
      <Card className="text-center" style={{ border: '1px solid #007bff', borderRadius: '10px' }}>
        <Card.Body>
          <Card.Title className="mb-4" style={{ color: '#007bff' }}>
            Next Customer Details by Counter
          </Card.Title>
          <div className="table-responsive">
            <Table striped bordered hover className="mx-auto" style={{ maxWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Counter ID</th>
                  <th>Service Name</th>
                  <th>Ticket ID</th>
                </tr>
              </thead>
              <tbody>
                {counters.map((counter) => (
                  <tr key={counter.counterId}>
                    <td className="text-center">{counter.counterId}</td>
                    <td className="text-center">{counter.serviceName || 'No service yet'}</td>
                    <td className="text-center">{counter.ticketId || 'No ticket yet'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CallCustomer;



