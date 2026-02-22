package com.pesatone.api.util;

import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

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
}
