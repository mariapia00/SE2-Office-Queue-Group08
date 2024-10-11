package it.polito.queuemanagementsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Service {

    //This class include information about service and his own queue
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer serviceId;
    private String serviceName;
    private Float averageServiceTime;
    private Integer queueLength;
    private Integer lastTicketNumber;
}