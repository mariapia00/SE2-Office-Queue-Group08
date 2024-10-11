package it.polito.queuemanagementsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@IdClass(CounterServiceKey.class)
public class CounterService {
    @Id
    @ManyToOne
    @JoinColumn(name = "serviceId")
    private Service service;
    @Id
    @ManyToOne
    @JoinColumn(name = "counterId")
    private Counter counter;
}