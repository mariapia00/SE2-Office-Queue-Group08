import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap'; // Importa i componenti Bootstrap

const NextCustomerComponent = () => {
    const [queues, setQueues] = useState([
        { serviceId: 1, serviceName: 'Service A', queueLength: 3 },
        { serviceId: 2, serviceName: 'Service B', queueLength: 5 },
        { serviceId: 3, serviceName: 'Service C', queueLength: 2 },
    ]);
    const [currentTicket, setCurrentTicket] = useState({ ticketId: 101, counterID: 1 });
    const [loading, setLoading] = useState(false);

    const fetchQueuesLength = () => {
        setLoading(false); // Usa dati statici, quindi setta loading a false
    };

    const handleCallNextCustomer = () => {
        const nextTicket = { ticketId: currentTicket.ticketId + 1, counterID: currentTicket.counterID };
        setCurrentTicket(nextTicket);
    };

    useEffect(() => {
        fetchQueuesLength();
    }, []);

    return (
        <div className="container mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Next Customer</Card.Title>
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <div>
                            <Card.Text>
                                <strong>Current Ticket:</strong> {currentTicket ? currentTicket.ticketId : 'None'}
                            </Card.Text>
                            <Button variant="primary" onClick={handleCallNextCustomer}>
                                Call Next Customer
                            </Button>
                            <Card.Subtitle className="mt-3 mb-2">Queue Lengths:</Card.Subtitle>
                            <ListGroup>
                                {queues.map((queue) => (
                                    <ListGroup.Item key={queue.serviceId}>
                                        Service: {queue.serviceName} - Length: {queue.queueLength}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default NextCustomerComponent;
