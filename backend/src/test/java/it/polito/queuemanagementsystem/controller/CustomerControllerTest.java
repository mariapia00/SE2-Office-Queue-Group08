package it.polito.queuemanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.polito.queuemanagementsystem.dto.in.CreateCustomerDTO;
import it.polito.queuemanagementsystem.model.Customer;
import it.polito.queuemanagementsystem.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CustomerControllerTest {

    @InjectMocks
    private CustomerController customerController;

    @Mock
    private CustomerService customerService;

    private MockMvc mockMvc;

    private Customer mockCustomer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(customerController).build();
        mockCustomer = new Customer(1, "John Doe", "john.doe@example.com", 30);
    }

    @Test
    void createCustomer_ShouldReturnCreatedCustomer() throws Exception {
        CreateCustomerDTO createCustomerDTO = new CreateCustomerDTO("John Doe", "john.doe@example.com", 30);
        when(customerService.saveCustomer(any(Customer.class))).thenReturn(mockCustomer);

        ObjectMapper objectMapper = new ObjectMapper();
        String customerDtoJson = objectMapper.writeValueAsString(createCustomerDTO);

        mockMvc.perform(post("/api/v1/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerDtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(mockCustomer.getId())))
                .andExpect(jsonPath("$.name", is(mockCustomer.getName())))
                .andExpect(jsonPath("$.email", is(mockCustomer.getEmail())))
                .andExpect(jsonPath("$.age", is(mockCustomer.getAge())));
    }

    @Test
    void getCustomerById_ShouldReturnCustomer_WhenCustomerExists() throws Exception {
        when(customerService.getCustomerById(mockCustomer.getId())).thenReturn(mockCustomer);

        mockMvc.perform(get("/api/v1/customers/{id}", mockCustomer.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(mockCustomer.getId())))
                .andExpect(jsonPath("$.name", is(mockCustomer.getName())))
                .andExpect(jsonPath("$.email", is(mockCustomer.getEmail())))
                .andExpect(jsonPath("$.age", is(mockCustomer.getAge())));
    }
}
