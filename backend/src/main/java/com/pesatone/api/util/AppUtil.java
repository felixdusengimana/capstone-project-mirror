package com.pesatone.api.util;

import com.pesatone.api.model.dto.flw.FlwCallBackDto;
import com.pesatone.api.model.dto.flw.FlwTransactionDetail;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Slf4j
public class AppUtil {

    public static Date getDateFromStringValue(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(date);
    }

    public static String generateOtp() {
        SecureRandom secureRandom = new SecureRandom();
        int otp = secureRandom.nextInt(900000) + 100000; // Generate a 6-digit random number between 100000 and 999999
        return String.valueOf(otp);
    }

    public static String getTransactionReference(String prefix){
        return prefix +"-" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }

    public static void verifyCallBack(String verifyHash, String flwVerifyHash, String request){
        if(!verifyHash.equals(flwVerifyHash)){
            log.error("Invalid hash {} for FLW callback {}",verifyHash,request);
            throw new IllegalArgumentException("We could not validate callback");
        }
    }

    public static String formatAmount(BigDecimal amount) {
        NumberFormat formatter = new DecimalFormat("###,###.00");
        return formatter.format(amount);
    }
}
