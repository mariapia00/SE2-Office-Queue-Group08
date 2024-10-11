import {
  Col,
  Container,
  ListGroup,
  Row,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import "./GetTicketComponent.css";

export default function GetTicketComponent(props: { services: string[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceSelected, setServiceSelected] = useState("");
  const [ticket, setTicket] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredServices = props.services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectService = (service: string) => {
    return () => {
      setServiceSelected(service);
    };
  };

  const handleGetTicket = (service: string) => {
    // Call the API to get the ticket
    // const ticket = await getTicket(serviceSelected);
    return () => {
      setTicket(service);
      setShowModal(true);
    };
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center full-height">
        <Row className="w-100">
          <Col>
            <h1 className="text-center w-100">Choose the service you need</h1>
          </Col>
        </Row>
        <Row className="w-100 mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search through our services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="w-100 flex-grow-1 overflow-auto">
          <Col>
            <ListGroup className="w-100">
              {filteredServices.map((service, index) => (
                <ListGroup.Item
                  action
                  key={index}
                  onClick={handleSelectService(service)}
                  active={service === serviceSelected}
                >
                  {service}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="w-100 d-flex justify-content-center mb-3">
          <Col className="d-flex justify-content-center">
            <Button
              className="btn btn-primary btn-lg"
              onClick={handleGetTicket(serviceSelected)}
            >
              Get ticket
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Your ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          QR code for ticket:
          <div className="mt-3 text-center">
            <img src="https://via.placeholder.com/150" alt="QR code" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
