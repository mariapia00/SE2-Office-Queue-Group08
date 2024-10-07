package it.polito.queuemanagementsystem.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.polito.queuemanagementsystem.dto.in.CreateCustomerDTO;
import it.polito.queuemanagementsystem.model.Customer;
import it.polito.queuemanagementsystem.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Customer")
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody CreateCustomerDTO createCustomerDTO) {
        Customer createdCustomer = customerService.saveCustomer(createCustomerDTO.toBo());
        return ResponseEntity.ok(createdCustomer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }
}