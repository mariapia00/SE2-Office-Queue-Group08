import { QRCodeSVG } from "qrcode.react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { jsPDF } from "jspdf";

export default function TicketComponent(props: {
  ticket: string;
  waitingTime: string;
}) {
  const ticket: string = props.ticket;
  const waitingTime: string = props.waitingTime;

  console.log("Ticket:", ticket);
  console.log("Waiting time:", waitingTime);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const qrCodeSize = 50;

    doc.text(`Your ticket number is: ${ticket}`, margin, 10);
    doc.text(`Estimated waiting time: ${waitingTime}`, margin, 20);

    // Generate QR code as an image and add it to the PDF
    const qrCodeElement = document.querySelector("svg");
    if (qrCodeElement) {
      const svgData = new XMLSerializer().serializeToString(qrCodeElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/png");
        const qrCodeX = (pageWidth - qrCodeSize) / 2;
        doc.addImage(imgData, "PNG", qrCodeX, 30, qrCodeSize, qrCodeSize);
        doc.save("ticket.pdf");
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } else {
      doc.save("Office-queue-ticket.pdf");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center full-height">
      <Row className="align-items-center justify-content-center">
        <Col>
          <h1>Your ticket id is: {ticket} </h1>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        <Col>
          <h2>Estimated waiting time: {waitingTime}</h2>
        </Col>
      </Row>
      <Row>
        <QRCodeSVG className="mt-3 " value={ticket || ""} />
      </Row>
      <Row>
        <Button variant="primary" className="mt-3" onClick={handleDownloadPDF}>
          Download
        </Button>
      </Row>
    </Container>
  );
}
