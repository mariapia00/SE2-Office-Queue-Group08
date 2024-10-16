import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import API from '../API';

const NextCustomerComponent = () => {
    const [queues, setQueues] = useState([]);
    const [currentTicket, setCurrentTicket] = useState({ ticketId: 101, counterID: 1 });
    const [loading, setLoading] = useState(true); 

    const fetchQueuesLength = async () => {
        setLoading(true); 
        const data = await API.getQueueStatus();
        setQueues(data); 
        setLoading(false); 
        console.log(data);
    };

    const handleCallNextCustomer = async () => {
        try{
            const nextCustomer = await API.getNextClientByCounterId(1);
            if(nextCustomer){
                setCurrentTicket(nextCustomer);
            } else {
                console.error('Failed to call next customer');
            }
        } catch(error) {
            console.error('Failed to call next customer:', error);
        }
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
                                    <ListGroup.Item key={queue.serviceName}>
                                        {queue.serviceName} - Length: {queue.queueLength}
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

