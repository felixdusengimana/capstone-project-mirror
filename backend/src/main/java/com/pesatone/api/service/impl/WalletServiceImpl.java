package com.pesatone.api.service.impl;

import com.pesatone.api.model.entity.*;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.LedgerTypeEnum;
import com.pesatone.api.repository.WalletLedgerRepository;
import com.pesatone.api.repository.WalletRepository;
import com.pesatone.api.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {
    private final WalletRepository walletRepository;
    private final WalletLedgerRepository walletLedgerRepository;

    @Transactional
    @Override
    public Wallet getOrCreateWallet(AppUser user, CurrencyEnum currency) {
        return walletRepository.getWalletByAppUserAndCurrency(user, currency)
                .orElseGet(() -> {
                    Wallet wallet = new Wallet();
                    wallet.setAppUser(user);
                    wallet.setCurrency(currency);
                    wallet.setBalance(BigDecimal.ZERO);
                    wallet.setCreatedAt(new Date());
                    wallet.setUpdatedAt(new Date());
                    walletRepository.save(wallet);
                    return wallet;
                });
    }

    @Transactional
    @Override
    public Wallet credit(Wallet wallet, PaymentTransaction transaction) {
        wallet.setBalance(wallet.getBalance().add(transaction.getAmount())
                .setScale(2, RoundingMode.HALF_UP));
        walletRepository.save(wallet);
        WalletLedger walletLedger = new WalletLedger();
        walletLedger.setAmount(transaction.getAmount());
        walletLedger.setNarration("Credit for Transaction " + transaction.getTransactionReference());
        walletLedger.setLedgerType(LedgerTypeEnum.CREDIT);
        walletLedger.setWallet(wallet);
        walletLedger.setPaymentTransaction(transaction);
        walletLedgerRepository.save(walletLedger);
        return wallet;
    }

    @Transactional
    @Override
    public Wallet debit(Wallet wallet, Payout payout) {
        wallet.setBalance(wallet.getBalance().subtract(payout.getAmount())
                .setScale(2, RoundingMode.HALF_UP));
        walletRepository.save(wallet);
        WalletLedger walletLedger = new WalletLedger();
        walletLedger.setAmount(payout.getAmount());
        walletLedger.setNarration("Payout withdrawal for " + payout.getTransactionReference());
        walletLedger.setLedgerType(LedgerTypeEnum.DEBIT);
        walletLedger.setWallet(wallet);
        walletLedger.setPayout(payout);
        walletLedgerRepository.save(walletLedger);
        return wallet;
    }

    @Transactional
    @Override
    public Wallet debit(Wallet wallet, PaymentTransaction transaction, BigDecimal amount) {
        wallet.setBalance(wallet.getBalance().subtract(amount)
                .setScale(2, RoundingMode.HALF_UP));
        walletRepository.save(wallet);
        WalletLedger walletLedger = new WalletLedger();
        walletLedger.setAmount(amount);
        walletLedger.setNarration("Transaction charges for " + transaction.getTransactionReference());
        walletLedger.setLedgerType(LedgerTypeEnum.DEBIT);
        walletLedger.setWallet(wallet);
        walletLedger.setPaymentTransaction(transaction);
        walletLedgerRepository.save(walletLedger);
        return wallet;
    }
}
