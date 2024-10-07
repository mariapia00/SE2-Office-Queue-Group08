package it.polito.queuemanagementsystem.service;

import it.polito.queuemanagementsystem.exception.CustomerNotFoundException;
import it.polito.queuemanagementsystem.model.Customer;
import it.polito.queuemanagementsystem.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CustomerServiceTest {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerRepository customerRepository;

    private Customer mockCustomer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockCustomer = new Customer(1, "John Doe", "john.doe@example.com", 30);
    }

    @Test
    void saveCustomer_ShouldReturnSavedCustomer() {
        when(customerRepository.save(any(Customer.class))).thenReturn(mockCustomer);

        Customer savedCustomer = customerService.saveCustomer(mockCustomer);

        assertNotNull(savedCustomer);
        assertEquals(mockCustomer.getId(), savedCustomer.getId());
        verify(customerRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void getCustomerById_ShouldReturnCustomer_WhenCustomerExists() {
        when(customerRepository.findById(mockCustomer.getId())).thenReturn(Optional.of(mockCustomer));

        Customer foundCustomer = customerService.getCustomerById(mockCustomer.getId());

        assertNotNull(foundCustomer);
        assertEquals(mockCustomer.getId(), foundCustomer.getId());
        verify(customerRepository, times(1)).findById(mockCustomer.getId());
    }

    @Test
    void getCustomerById_ShouldThrowException_WhenCustomerDoesNotExist() {
        when(customerRepository.findById(mockCustomer.getId())).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () -> customerService.getCustomerById(mockCustomer.getId()));

        verify(customerRepository, times(1)).findById(mockCustomer.getId());
    }
}
