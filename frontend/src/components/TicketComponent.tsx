import { QRCodeSVG } from "qrcode.react";
import { Button, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

export default function TicketComponent() {
  const { ticketId } = useParams<{ ticketId: string }>();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Your ticket number is: 111`, 10, 10);
    doc.text(`Service: ${ticketId}`, 10, 30);

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
        doc.addImage(imgData, "PNG", 10, 40, 50, 50);
        doc.save("ticket.pdf");
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } else {
      doc.save("ticket.pdf");
    }
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center full-height">
        <Row className="align-items-center justify-content-center">
          <h1>Your ticket number is: 111</h1>
          <h2>Estimated waiting time: 3 minutes</h2>
          <h3>Service: {ticketId}</h3>
        </Row>
        <Row>
          <QRCodeSVG className="mt-3 " value={ticketId || ""} />
        </Row>
        <Row>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleDownloadPDF}
          >
            Download
          </Button>
        </Row>
      </Container>
    </>
  );
}
