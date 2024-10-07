package it.polito.queuemanagementsystem.dto.in;

import it.polito.queuemanagementsystem.model.Customer;

public record CreateCustomerDTO(String name, String email, Integer age) {
    public Customer toBo() {
        return new Customer(null, this.name, this.email, this.age);
    }
}
