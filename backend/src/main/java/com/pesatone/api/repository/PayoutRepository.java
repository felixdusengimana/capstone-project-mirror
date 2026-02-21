package com.pesatone.api.repository;

import com.pesatone.api.model.entity.Payout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayoutRepository extends JpaRepository<Payout,Long> {
}
