package com.pesatone.api.service;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.WithdrawalAccountDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.WithdrawalAccountRepository;
import com.pesatone.api.service.impl.WithdrawalAccountServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WithdrawalAccountServiceImplTest {

    @Mock private WithdrawalAccountRepository accountRepository;
    @Mock private BankRepository bankRepository;
    @Mock private RequestPrincipal principal;
    @InjectMocks private WithdrawalAccountServiceImpl service;

    private AppUser user;

    @BeforeEach
    void setUp() {
        user = new AppUser();
        user.setId(1L);
    }

    private WithdrawalAccountDto dto(PayoutChannelEnum type, String bankCode) {
        WithdrawalAccountDto d = new WithdrawalAccountDto();
        d.setAccountType(type);
        d.setAccountNumber("123456");
        d.setAccountName("Felix");
        d.setBankCode(bankCode);
        return d;
    }

    @Test
    void createAccount_returnsExistingWhenPresent() {
        WithdrawalAccount existing = new WithdrawalAccount();
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreatorAndAccountType(user, PayoutChannelEnum.MOBILE_MONEY))
                .thenReturn(Optional.of(existing));
        assertSame(existing, service.createAccount(dto(PayoutChannelEnum.MOBILE_MONEY, null)));
        verify(accountRepository, never()).save(any());
    }

    @Test
    void createAccount_createsMobileMoneyAccount() {
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreatorAndAccountType(user, PayoutChannelEnum.MOBILE_MONEY))
                .thenReturn(Optional.empty());
        when(accountRepository.save(any(WithdrawalAccount.class))).thenAnswer(i -> i.getArgument(0));
        WithdrawalAccount created = service.createAccount(dto(PayoutChannelEnum.MOBILE_MONEY, null));
        assertEquals("123456", created.getAccountNumber());
        verify(accountRepository).save(any());
    }

    @Test
    void createAccount_bankAccountRequiresBankCode() {
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreatorAndAccountType(user, PayoutChannelEnum.BANK_ACCOUNT))
                .thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class,
                () -> service.createAccount(dto(PayoutChannelEnum.BANK_ACCOUNT, null)));
    }

    @Test
    void createAccount_bankAccountWithMissingBankThrows() {
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreatorAndAccountType(user, PayoutChannelEnum.BANK_ACCOUNT))
                .thenReturn(Optional.empty());
        when(bankRepository.findByCode("XYZ")).thenReturn(Optional.empty());
        assertThrows(PesatoneNotFoundException.class,
                () -> service.createAccount(dto(PayoutChannelEnum.BANK_ACCOUNT, "XYZ")));
    }

    @Test
    void createAccount_bankAccountSavesWithBank() {
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreatorAndAccountType(user, PayoutChannelEnum.BANK_ACCOUNT))
                .thenReturn(Optional.empty());
        when(bankRepository.findByCode("BK")).thenReturn(Optional.of(new Bank()));
        when(accountRepository.save(any(WithdrawalAccount.class))).thenAnswer(i -> i.getArgument(0));
        WithdrawalAccount created = service.createAccount(dto(PayoutChannelEnum.BANK_ACCOUNT, "BK"));
        assertNotNull(created.getBank());
    }

    @Test
    void updateAccount_throwsWhenNotFound() {
        when(accountRepository.findById(9L)).thenReturn(Optional.empty());
        assertThrows(PesatoneNotFoundException.class,
                () -> service.updateAccount(9L, dto(PayoutChannelEnum.MOBILE_MONEY, null)));
    }

    @Test
    void updateAccount_throwsWhenNotOwner() {
        AppUser other = new AppUser();
        other.setId(2L);
        WithdrawalAccount account = new WithdrawalAccount();
        account.setCreator(other);
        when(accountRepository.findById(5L)).thenReturn(Optional.of(account));
        when(principal.getLoggedInUser()).thenReturn(user);
        assertThrows(PesatoneNotFoundException.class,
                () -> service.updateAccount(5L, dto(PayoutChannelEnum.MOBILE_MONEY, null)));
    }

    @Test
    void updateAccount_savesWhenOwner() {
        WithdrawalAccount account = new WithdrawalAccount();
        account.setCreator(user);
        when(accountRepository.findById(5L)).thenReturn(Optional.of(account));
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.save(account)).thenReturn(account);
        WithdrawalAccount updated = service.updateAccount(5L, dto(PayoutChannelEnum.MOBILE_MONEY, null));
        assertEquals("123456", updated.getAccountNumber());
    }

    @Test
    void getAccounts_mapsToPojo() {
        WithdrawalAccount account = new WithdrawalAccount();
        account.setAccountType(PayoutChannelEnum.MOBILE_MONEY);
        when(principal.getLoggedInUser()).thenReturn(user);
        when(accountRepository.findByCreator(user)).thenReturn(List.of(account));
        assertEquals(1, service.getAccounts().size());
    }
}
