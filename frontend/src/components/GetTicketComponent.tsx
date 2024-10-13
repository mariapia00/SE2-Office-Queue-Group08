import { Col, Container, Row, Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./GetTicketComponent.css";

export default function GetTicketComponent(props: {
  services: string[];
  ticket: string;
  handleTicket: (service: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceSelected, setServiceSelected] = useState("");
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
      props.handleTicket(service);
      setShowModal(true);
    };
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setServiceSelected("");
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
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        <Container className="w-100 flex-grow-1 overflow-auto">
          <Row>
            {filteredServices.map((service, index) => (
              <Col key={index} xs={6} md={3} className="mb-3">
                <ServicesComponent
                  service={service}
                  imageUrl={"https://via.placeholder.com/150"}
                  onClick={handleSelectService(service)}
                  isSelected={service === serviceSelected}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <Row className="w-100 d-flex justify-content-center mb-3">
          <Col className="d-flex justify-content-center">
            <Button
              className="btn btn-primary btn-lg"
              onClick={handleGetTicket(serviceSelected)}
              disabled={!serviceSelected}
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
            <QRCodeSVG
              value={`https://4422-130-192-232-225.ngrok-free.app/tickets/${props.ticket}`} // Update the URL every time you run ngrok
              size={128}
            />
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

function ServicesComponent(props: {
  service: string;
  imageUrl: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <Button
      className={`service-button ${props.isSelected ? "selected" : ""}`}
      onClick={props.onClick}
      style={{
        width: "100%",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        border: props.isSelected ? "2px solid #007bff" : "1px solid #ddd",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: props.isSelected ? "#e9f5ff" : "#fff",
        color: "black",
      }}
    >
      <img
        src={props.imageUrl}
        alt={props.service}
        style={{ maxHeight: "80px", marginBottom: "10px" }}
      />
      <span>{props.service}</span>
    </Button>
  );
}
