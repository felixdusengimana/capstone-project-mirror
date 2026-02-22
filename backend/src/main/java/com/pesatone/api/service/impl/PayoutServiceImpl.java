package com.pesatone.api.service.impl;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.PagedList;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.entity.QPayout;
import com.pesatone.api.model.entity.Wallet;
import com.pesatone.api.model.enumeration.OtpTypeEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.search.filter.PayoutSearchFilter;
import com.pesatone.api.model.search.response.PayoutSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.repository.PayoutRepository;
import com.pesatone.api.service.OtpService;
import com.pesatone.api.service.PayoutService;
import com.pesatone.api.service.WalletService;
import com.pesatone.api.util.AppUtil;
import com.querydsl.core.types.Projections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PayoutServiceImpl implements PayoutService {
    private final PayoutRepository payoutRepository;
    private final OtpService otpService;
    private final WalletService walletService;
    private final CriteriaBuilderFactory builderFactory;
    private final EntityManager entityManager;
    private final RequestPrincipal requestPrincipal;

    @Transactional
    @Override
    public Payout initiatePayout(AppUser creator, PayoutRequestDto dto) {
        Wallet wallet = walletService.getOrCreateWallet(creator, dto.getCurrency());
        validatePayoutRequest(creator, wallet ,dto);
        Payout payout = new Payout();
        payout.setAmount(dto.getAmount());
        payout.setCurrency(dto.getCurrency());
        payout.setPaymentChannel(dto.getPaymentChannel());
        payout.setCreator(creator);
        payout.setWallet(wallet);
        payout.setPaymentStatus(PaymentStatusEnum.PENDING);
        payout.setTransactionReference(AppUtil.getTransactionReference("WT"));
        return payoutRepository.save(payout);
    }

    @Override
    public QueryResultPojo<PayoutSearchResponse> searchPayouts(PayoutSearchFilter filter) {
        QPayout qPayout = QPayout.payout;
        BlazeJPAQuery<AppUser> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);
        blazeQuery.from(qPayout);
        if(requestPrincipal.isCreator()){
            blazeQuery.where(qPayout.creator.id.eq(requestPrincipal.getLoggedInUser().getId()));
        }
        if(filter.getCurrency() != null){
            blazeQuery.where(qPayout.currency.eq(filter.getCurrency()));
        }
        if(filter.getPaymentStatus() != null){
            blazeQuery.where(qPayout.paymentStatus.eq(filter.getPaymentStatus()));
        }
        if(requestPrincipal.isAdmin() && StringUtils.isNotBlank(filter.getCreatorTag())){
            blazeQuery.where(qPayout.creator.username.containsIgnoreCase(filter.getCreatorTag()));
        }

        blazeQuery.orderBy(qPayout.createdAt.desc(), qPayout.id.desc());

        PagedList<PayoutSearchResponse> pagedList = blazeQuery
                .select(Projections.constructor(
                        PayoutSearchResponse.class,
                        qPayout.id,
                        qPayout.amount,
                        qPayout.currency,
                        qPayout.paymentChannel,
                        qPayout.paymentStatus,
                        qPayout.transactionReference,
                        qPayout.createdAt,
                        qPayout.processedAt
                ))
                .fetchPage(filter.getOffset(), filter.getPageNumber());

        return new QueryResultPojo<>(pagedList, filter.getPageNumber(), filter.getPageSize(), pagedList.getTotalPages());

    }

    private void validatePayoutRequest(AppUser user,Wallet wallet, PayoutRequestDto dto) {
        if(BooleanUtils.isNotTrue(user.getVerified())){
            throw new PesatoneException("Your account must be verified before you can proceed with withdrawals");
        }
        if(dto.getAmount().compareTo(wallet.getBalance()) > 0){
            throw new PesatoneException("Insufficient balance");
        }
        if(payoutRepository.countPendingPayouts(wallet) > 0){
            throw new PesatoneException("You already have pending payouts for this currency.");
        }
        // check if user has set-up and verified payout mode
        boolean validOtp = otpService.verifyOtp(user, OtpTypeEnum.PAYOUT, dto.getOtp());
        if(BooleanUtils.isFalse(validOtp)){
            throw new PesatoneException("Cannot verify OTP. Please try again later");
        }
    }
}
