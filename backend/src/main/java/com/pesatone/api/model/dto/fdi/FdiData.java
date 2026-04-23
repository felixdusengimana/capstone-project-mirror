package com.pesatone.api.model.dto.fdi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiData {
    private String state;
    private String gwRef;
    private String trxRef;
    private String channelRef;
    private String message;
    private String trxStatus;
    private String channelTrxStatus;
}
