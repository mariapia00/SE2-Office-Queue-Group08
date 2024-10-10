import { Container, ListGroup, Row } from "react-bootstrap";
// import { useState } from "react";

export default function GetTicketComponent() {
  // const [serviceSelected, setServiceSelected] = useState(null);

  return (
    <>
      <Container>
        <Row>
          <h1>Choose the service you need from the list below</h1>
        </Row>
        <Row>
          <ListGroup>
            <ListGroup.Item action>Service 1</ListGroup.Item>
            <ListGroup.Item action>Service 2</ListGroup.Item>
            <ListGroup.Item action>Service 3</ListGroup.Item>
          </ListGroup>
        </Row>
        <Row className="mt-3">
          <button className="btn btn-primary">Get ticket</button>
        </Row>
      </Container>
    </>
  );
}
