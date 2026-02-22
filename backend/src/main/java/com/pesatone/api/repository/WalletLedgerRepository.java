package com.pesatone.api.repository;

import com.pesatone.api.model.entity.WalletLedger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletLedgerRepository  extends JpaRepository<WalletLedger, Long> {
}
