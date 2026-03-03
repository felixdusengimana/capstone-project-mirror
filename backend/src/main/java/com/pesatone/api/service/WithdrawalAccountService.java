package com.pesatone.api.service;

import com.pesatone.api.model.dto.WithdrawalAccountDto;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.pojo.WithdrawalAccountPojo;

import java.util.List;

public interface WithdrawalAccountService {
    WithdrawalAccount createAccount(WithdrawalAccountDto dto);
    WithdrawalAccount updateAccount(Long accountId, WithdrawalAccountDto dto);
    List<WithdrawalAccountPojo> getAccounts();
}
