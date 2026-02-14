package com.pesatone.api.repository;

import com.pesatone.api.model.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    @Query("select u from PaymentTransaction u inner join fetch u.creator where u.transactionReference = ?1")
    Optional<PaymentTransaction> findByTransactionReference(String transactionReference);
}
