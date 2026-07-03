package com.pesatone.api.service;

import com.pesatone.api.model.dto.BankDto;
import com.pesatone.api.model.dto.CountryDto;
import com.pesatone.api.model.dto.IndustryDto;
import com.pesatone.api.model.pojo.BankResponse;
import com.pesatone.api.model.pojo.CountryResponse;
import com.pesatone.api.model.pojo.IndustryResponse;

import java.util.List;

public interface ResourceService {

    List<IndustryResponse> getIndustries();

    IndustryResponse createIndustry(IndustryDto dto);

    IndustryResponse updateIndustry(Long id, IndustryDto dto);

    void deactivateIndustry(Long id);

    List<CountryResponse> getCountries();

    CountryResponse createCountry(CountryDto dto);

    CountryResponse updateCountry(Long id, CountryDto dto);

    void deactivateCountry(Long id);

    List<BankResponse> getBanks();

    BankResponse createBank(BankDto dto);

    BankResponse updateBank(Long id, BankDto dto);

    void deactivateBank(Long id);
}
