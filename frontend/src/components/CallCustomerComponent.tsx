import React from 'react';

const PostOfficeDisplay = () => {
  // Dati statici
  const data = [
    { counter: 1, service: 'Service 1', ticket: 'A001' },
    { counter: 2, service: 'Service 2', ticket: 'B002' },
    { counter: 3, service: 'Service 3', ticket: 'C003' },
    { counter: 4, service: 'Service 4', ticket: 'D004' },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Principle Display</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Counter</th>
            <th scope="col">Service</th>
            <th scope="col">Ticket code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.counter}</td>
              <td>{item.service}</td>
              <td>{item.ticket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostOfficeDisplay;


