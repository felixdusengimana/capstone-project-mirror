package com.pesatone.api.service.impl;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.WithdrawalAccountDto;
import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import com.pesatone.api.model.pojo.WithdrawalAccountPojo;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.WithdrawalAccountRepository;
import com.pesatone.api.service.WithdrawalAccountService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class WithdrawalAccountServiceImpl implements WithdrawalAccountService {
    private final WithdrawalAccountRepository accountRepository;
    private final BankRepository bankRepository;
    private final RequestPrincipal principal;

    @Override
    @Transactional
    public WithdrawalAccount createAccount(WithdrawalAccountDto dto) {
        return accountRepository.findByCreatorAndAccountType(principal.getLoggedInUser(),
                dto.getAccountType()).orElseGet(() -> {
            WithdrawalAccount account = new WithdrawalAccount();
            account.setAccountType(dto.getAccountType());
            account.setAccountNumber(dto.getAccountNumber());
            account.setAccountName(dto.getAccountName());
            account.setCreator(principal.getLoggedInUser());
            if (dto.getAccountType().equals(PayoutChannelEnum.BANK_ACCOUNT)) {
                if (StringUtils.isBlank(dto.getBankCode())) {
                    throw new IllegalArgumentException("Bank code is required for bank account");
                }
                Bank bank =  bankRepository.findByCode(dto.getBankCode())
                        .orElseThrow(()-> new PesatoneNotFoundException("Bank not found"));

               account.setBank(bank);
            }
            return accountRepository.save(account);
        });
    }

    @Transactional
    @Override
    public WithdrawalAccount updateAccount(Long accountId, WithdrawalAccountDto dto) {
        WithdrawalAccount account = accountRepository.findById(accountId).orElseThrow(() ->
                new PesatoneNotFoundException("Withdrawal account not found"));
        if(!account.getCreator().getId().equals(principal.getLoggedInUser().getId())){
            throw new PesatoneNotFoundException("Unauthorized to update this account");
        }
        account.setAccountNumber(dto.getAccountNumber());
        account.setAccountName(dto.getAccountName());
        if (StringUtils.isNotBlank(dto.getBankCode())) {
            bankRepository.findByCode(dto.getBankCode()).ifPresent(account::setBank);
        }
        return accountRepository.save(account);
    }

    @Override
    public List<WithdrawalAccountPojo> getAccounts() {
        return accountRepository.findByCreator(principal.getLoggedInUser())
                .stream()
                .map(WithdrawalAccountPojo::new)
                .collect(Collectors.toList());
    }
}
