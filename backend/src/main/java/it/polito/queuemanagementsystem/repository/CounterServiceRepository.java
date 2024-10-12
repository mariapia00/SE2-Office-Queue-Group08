package it.polito.queuemanagementsystem.repository;

import it.polito.queuemanagementsystem.model.CounterService;
import it.polito.queuemanagementsystem.model.CounterServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounterServiceRepository extends JpaRepository<CounterService, CounterServiceId> {
}
