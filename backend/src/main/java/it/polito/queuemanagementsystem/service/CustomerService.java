package it.polito.queuemanagementsystem.service;

import it.polito.queuemanagementsystem.exception.CustomerNotFoundException;
import it.polito.queuemanagementsystem.model.Customer;
import it.polito.queuemanagementsystem.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));
    }
}
