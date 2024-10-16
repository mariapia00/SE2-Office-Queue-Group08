package it.polito.queuemanagementsystem.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CounterServiceId implements Serializable {
    private Long counterId;
    private Long serviceId;
}
