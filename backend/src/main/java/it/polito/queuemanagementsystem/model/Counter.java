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
public class Counter {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer counterId;
}