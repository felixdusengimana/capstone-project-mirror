package com.pesatone.api.service;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.entity.Wallet;
import com.pesatone.api.model.enumeration.CurrencyEnum;

import java.math.BigDecimal;

public interface WalletService {
    Wallet getOrCreateWallet(AppUser user, CurrencyEnum currency);
    Wallet credit(Wallet wallet, PaymentTransaction transaction);
    Wallet debit(Wallet wallet,PaymentTransaction transaction, BigDecimal amount);
    Wallet debit(Wallet wallet, Payout payout);
}
