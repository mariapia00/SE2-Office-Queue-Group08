package it.polito.queuemanagementsystem.repository;

import it.polito.queuemanagementsystem.model.CounterService;
import it.polito.queuemanagementsystem.model.CounterServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounterServiceRepository extends JpaRepository<CounterService, CounterServiceId> {

    @Query("SELECT cs FROM CounterService cs WHERE cs.service.serviceId = :serviceId")
    List<CounterService> findByServiceId(Long serviceId);

    @Query("SELECT COUNT(DISTINCT cs.service) FROM CounterService cs WHERE cs.counter.counterId = :counterId")
    int countDistinctServicesForCounter(Long counterId);
}
