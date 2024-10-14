package it.polito.queuemanagementsystem.controller;

import it.polito.queuemanagementsystem.dto.request.GetTicketRequestDTO;
import it.polito.queuemanagementsystem.dto.response.GetTicketResponseDTO;
import it.polito.queuemanagementsystem.dto.response.QueueStatusDTO;
import it.polito.queuemanagementsystem.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping("/generate")
    public ResponseEntity<GetTicketResponseDTO> generateTicket(@RequestBody GetTicketRequestDTO serviceIdRequest) {
        // Call the service to generate the ticket code and calculate the waiting time
        GetTicketResponseDTO ticketResponse = serviceService.generateTicket(serviceIdRequest.serviceId());
        return ResponseEntity.ok(ticketResponse);
    }

    // Endpoint to get the current queue lengths for all services
    @GetMapping("/queues/status")
    public ResponseEntity<List<QueueStatusDTO>> getQueuesStatus() {
        List<QueueStatusDTO> queuesStatus = serviceService.getQueuesStatus();
        return ResponseEntity.ok(queuesStatus); // Return 200 OK with the list of queue statuses
    }
}
