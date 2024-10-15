import Ticket from "./model/Ticket";
import Service from "./model/Service";

const BASEURL = 'http://localhost:8080/api';

// API to get all services
const getAllServices = async (): Promise<Service[]> => {
    return await fetch(BASEURL + '/v1/services')
        .then(handleInvalidResponse)
        .then(response => response.json())
        .then(data => {
            return data.map((service: { serviceId: string, serviceName: string }) => new Service(service.serviceId, service.serviceName));
        });
};



// API call to get a ticket
const getTicket = async (serviceId: string): Promise<Ticket> => {
    return await fetch(BASEURL + '/v1/tickets/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId })
    })
    .then(handleInvalidResponse)
    .then(response => response.json())
    .then((data: { ticketCode: string, waitingTime: string }) => {
        return new Ticket(data.ticketCode, data.waitingTime);
    });
};

// API to call the next customer by the officer (counterID) that returns the ticket number
const callNextClient = async (counterID: string): Promise<Object> => {
    return await fetch(BASEURL + '/customer/next', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counterID })
    })
    .then(handleInvalidResponse)
    .then(response => response.json());
    
};

// Each time a new ticket is issued or one queue changes, call this to get queue lengths
const getQueuesLength = async (): Promise<Object[]> => {
    return await fetch(BASEURL + '/v1/services/queues/status')
        .then(handleInvalidResponse)
        .then(response => response.json())
        .then(data => {
            return data.map((service: { serviceName: string, queueLength: number }) => {
                return { serviceName: service.serviceName, queueLength: service.queueLength };
            });
        });
};

// Helper function to handle invalid responses
function handleInvalidResponse(response: Response): Response {
    if (!response.ok) { 
        throw new Error(response.statusText); 
    }
    const type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1) {
        throw new TypeError(`Expected JSON, got ${type}`);
    }
    return response;
}

// Export API object containing the methods
const API = {   
    getAllServices,
    getTicket,
    callNextClient,
    getQueuesLength
};

export default API;
