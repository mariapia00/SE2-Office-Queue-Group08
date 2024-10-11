import dayjs from 'dayjs';

const a = dayjs();
const BASEURL = '/api';

// API to get all services
const getAllServices = async() => {
    return await fetch(BASEURL + '/services')
        .then(handleInvalidResponse)
        .then(response => response.json())
};

// API call to get a ticket
const getTicket = async(serviceType) => {
    return await fetch(BASEURL + '/customer/newticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({serviceType})
    }).then(handleInvalidResponse)
      .then(response => response.json())
};

// API to call the next customer by the officer (counterID) that return the ticket number
// the ticket id will be show also on the main display board to update the customers
// TODO: check if you have to use POST or PUT cause you call the new customer to the counter but you don't create a new resource
const callNextClient = async(counterID) => {
    return await fetch(BASEURL + '/customer/next', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({counterID})
    }).then(handleInvalidResponse)
      .then(response => response.json())
};

// each time a new ticket is issued or one queue changes you have to call it 
const getQueuesLength = async() => {
    return await fetch(BASEURL + '/customer/queueslength')
        .then(handleInvalidResponse)
        .then(response => response.json())
};
                                                                                                                                                                                                                                          
function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText); }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1) {
      throw new TypeError(`Expected JSON, got ${type}`);
    }
    return response;
  
}

const API = {   
    getAllServices,
    getTicket,
    callNextClient,
    getQueuesLength
};
export default API;