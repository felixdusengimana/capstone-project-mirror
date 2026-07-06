package com.pesatone.api.service;

import com.pesatone.api.model.entity.*;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.repository.WalletLedgerRepository;
import com.pesatone.api.repository.WalletRepository;
import com.pesatone.api.service.impl.WalletServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WalletServiceImplTest {

    @Mock private WalletRepository walletRepository;
    @Mock private WalletLedgerRepository walletLedgerRepository;
    @InjectMocks private WalletServiceImpl walletService;

    private AppUser user;
    private Wallet wallet;

    @BeforeEach
    void setUp() {
        user = new AppUser();
        user.setId(1L);
        wallet = new Wallet();
        wallet.setBalance(new BigDecimal("100.00"));
    }

    @Test
    void getOrCreateWallet_returnsExisting() {
        when(walletRepository.getWalletByAppUserAndCurrency(user, CurrencyEnum.RWF))
                .thenReturn(Optional.of(wallet));
        assertSame(wallet, walletService.getOrCreateWallet(user, CurrencyEnum.RWF));
        verify(walletRepository, never()).save(any());
    }

    @Test
    void getOrCreateWallet_createsWhenMissing() {
        when(walletRepository.getWalletByAppUserAndCurrency(user, CurrencyEnum.RWF))
                .thenReturn(Optional.empty());
        Wallet created = walletService.getOrCreateWallet(user, CurrencyEnum.RWF);
        assertEquals(BigDecimal.ZERO, created.getBalance());
        assertEquals(StatusEnum.ACTIVE, created.getStatus());
        verify(walletRepository).save(created);
    }

    @Test
    void credit_increasesBalanceAndWritesLedger() {
        PaymentTransaction tx = new PaymentTransaction();
        tx.setAmount(new BigDecimal("50.00"));
        tx.setTransactionReference("TXN-1");
        Wallet result = walletService.credit(wallet, tx);
        assertEquals(new BigDecimal("150.00"), result.getBalance());
        verify(walletLedgerRepository).save(any(WalletLedger.class));
    }

    @Test
    void debitWithPayout_decreasesBalanceAndWritesLedger() {
        Payout payout = new Payout();
        payout.setAmount(new BigDecimal("30.00"));
        payout.setTransactionReference("PO-1");
        Wallet result = walletService.debit(wallet, payout);
        assertEquals(new BigDecimal("70.00"), result.getBalance());
        verify(walletLedgerRepository).save(any(WalletLedger.class));
    }

    @Test
    void debitWithChargeAmount_decreasesBalance() {
        PaymentTransaction tx = new PaymentTransaction();
        tx.setTransactionReference("TXN-2");
        Wallet result = walletService.debit(wallet, tx, new BigDecimal("10.00"));
        assertEquals(new BigDecimal("90.00"), result.getBalance());
        verify(walletLedgerRepository).save(any(WalletLedger.class));
    }
}
