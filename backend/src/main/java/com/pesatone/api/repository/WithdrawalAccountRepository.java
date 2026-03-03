package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WithdrawalAccountRepository extends JpaRepository<WithdrawalAccount, Long> {
    Optional<WithdrawalAccount> findByCreatorAndAccountType(AppUser creator, PayoutChannelEnum accountType);

    @Query("select ac from WithdrawalAccount ac left join fetch ac.bank where ac.creator =?1")
    List<WithdrawalAccount> findByCreator(AppUser creator);

    @Query("select ac from WithdrawalAccount ac join fetch ac.creator where ac.id =?1")
    @NotNull
    Optional<WithdrawalAccount> findById(@NotNull Long id);
}
