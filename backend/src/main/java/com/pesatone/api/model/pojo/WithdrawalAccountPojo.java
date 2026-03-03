package com.pesatone.api.model.pojo;

import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

@Getter
@Setter
public class WithdrawalAccountPojo {
    private Long id;
    private String accountNumber;
    private String accountName;
    private PayoutChannelEnum accountType;
    private BankPojo bank;

    public WithdrawalAccountPojo(WithdrawalAccount account) {
        this.id = account.getId();
        this.accountNumber = account.getAccountNumber();
        this.accountName = account.getAccountName();
        this.accountType = account.getAccountType();
        if (account.getBank() != null && Hibernate.isInitialized(account.getBank())) {
            this.bank = new BankPojo(
                    account.getBank().getId(),
                    account.getBank().getName(),
                    account.getBank().getCode());
        }
    }
}
