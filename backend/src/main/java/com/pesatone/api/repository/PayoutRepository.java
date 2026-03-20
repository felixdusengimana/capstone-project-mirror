package com.pesatone.api.repository;

import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PayoutRepository extends JpaRepository<Payout,Long> {
    @Query("SELECT p FROM Payout p join fetch p.wallet join fetch p.creator WHERE p.transactionReference = ?1 ")
    Optional<Payout> findByTransactionReference(String reference);

    @Query("select count (p.id) from Payout p where p.paymentStatus='PENDING' and p.wallet = ?1 ")
    long countPendingPayouts(Wallet wallet);
}
