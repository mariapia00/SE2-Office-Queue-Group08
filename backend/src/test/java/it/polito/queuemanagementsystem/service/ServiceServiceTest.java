package it.polito.queuemanagementsystem.service;

import it.polito.queuemanagementsystem.dto.response.GetTicketResponseDTO;
import it.polito.queuemanagementsystem.model.Counter;
import it.polito.queuemanagementsystem.model.CounterService;
import it.polito.queuemanagementsystem.model.CounterServiceId;
import it.polito.queuemanagementsystem.model.Service;
import it.polito.queuemanagementsystem.repository.CounterServiceRepository;
import it.polito.queuemanagementsystem.repository.ServiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ServiceServiceTest {

    @Mock
    private ServiceRepository serviceRepository;

    @Mock
    private CounterServiceRepository counterServiceRepository;

    @InjectMocks
    private ServiceService serviceService;

    private Service mockService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        // Mocking Service entity with service_id 5
        mockService = new Service();
        mockService.setServiceId(5L);
        mockService.setServiceAbbreviation("PPT");
        mockService.setLastTicketNumber(4);  // Last ticket issued was 4
        mockService.setQueueLength(4);  // 4 people already in the queue
        mockService.setAverageServiceTime(5); // Average service time is 5 minutes
    }

    @Test
    void generateTicket_ShouldReturnCorrectTicketCodeAndWaitingTime() {
        // Mocking the service to be found by serviceRepository
        when(serviceRepository.findById(5L)).thenReturn(Optional.of(mockService));

        // Mocking available counters for the service
        Counter counter1 = new Counter(1L);  // Counter 1 that can serve the service
        Counter counter2 = new Counter(2L);  // Counter 2 that can serve the service

        CounterService counterService1 = new CounterService(new CounterServiceId(1L, 5L), counter1, mockService);
        CounterService counterService2 = new CounterService(new CounterServiceId(2L, 5L), counter2, mockService);

        when(counterServiceRepository.findByServiceId(5L)).thenReturn(List.of(counterService1, counterService2));

        // Mocking that both counters can serve multiple services
        when(counterServiceRepository.countDistinctServicesForCounter(1L)).thenReturn(1);  // Counter 1 serves 1 service
        when(counterServiceRepository.countDistinctServicesForCounter(2L)).thenReturn(2);  // Counter 2 serves 2 services

        // Calling the actual service method
        GetTicketResponseDTO response = serviceService.generateTicket(5L);

        // Verifying the expected results
        assertEquals("PPT-5", response.ticketCode());
        assertEquals("00h15m49s", response.waitingTime());

        // Verify that the serviceRepository was saved once
        verify(serviceRepository, times(1)).save(any(Service.class));
    }

    @Test
    void generateTicket_ShouldThrowException_WhenServiceNotFound() {
        // Mocking service not found
        when(serviceRepository.findById(99L)).thenReturn(Optional.empty());

        // Expecting an exception when the service is not found
        assertThrows(RuntimeException.class, () -> serviceService.generateTicket(5L));

        // Verifying that the serviceRepository.save() was never called
        verify(serviceRepository, times(0)).save(any(Service.class));
    }
}
