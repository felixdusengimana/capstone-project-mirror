package com.pesatone.api.model.dto.fdi;

import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiAuthData {
    private String token;
    private String expires_at;

    public boolean hasExpired(){
        if(this.expires_at == null){
            return true;
        }
         try {
            Date expiring = DateUtils.parseDate(this.expires_at, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
            return expiring.before(new Date());
        }catch (Exception ex){
            return true;
        }
    }
}
