package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.Wallet;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> getWalletByAppUserAndCurrency(AppUser appUser, CurrencyEnum currency);
}
