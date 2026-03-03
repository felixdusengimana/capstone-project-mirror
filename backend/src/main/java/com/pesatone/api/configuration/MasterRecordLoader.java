package com.pesatone.api.configuration;

import com.google.gson.Gson;
import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.entity.Country;
import com.pesatone.api.model.entity.Industry;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import com.pesatone.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 **/

@Component
@RequiredArgsConstructor
@Slf4j
public class MasterRecordLoader {
    private final IndustryRepository industryRepository;
    private final CountryRepository countryRepository;
    private final AppUserRepository userRepository;
    private final BankRepository bankRepository;
    private final Gson gson;
    private final UserService userService;


    @Value("${application.admin.email}")
    private String adminEmail;
    @Value("${application.admin.password}")
    private String adminPassword;

    @EventListener(ContextRefreshedEvent.class)
    public void loadRecords(){
        loadIndustries();
        loadCountries();
        loadBanks();
        createDefaultAdminUser();
    }

    private void loadIndustries(){
        log.info("**** loading industries ****");
        try (InputStreamReader reader = new InputStreamReader(Objects.requireNonNull(getClass().getResourceAsStream("/master_records/industries.json")))) {
            Industry[] dtoList = gson.fromJson(gson.newJsonReader(reader), Industry[].class);
            List<Industry> industries = new ArrayList<>();
            for (Industry industryDto : dtoList) {
                if (industryRepository.findActiveByCode(industryDto.getCode()).isEmpty()) {
                    industryDto.setStatus(StatusEnum.ACTIVE);
                    industries.add(industryDto);
                }
            }
            industryRepository.saveAll(industries);
        }catch (Exception ex){
            log.error("Error loading industries {}", ex.getMessage());
        }
    }

    private void loadCountries(){
        log.info("**** loading countries ****");
        try (InputStreamReader reader = new InputStreamReader(Objects.requireNonNull(getClass().getResourceAsStream("/master_records/countries.json")))) {
            Country[] dtoList = gson.fromJson(gson.newJsonReader(reader), Country[].class);
            List<Country> countries = new ArrayList<>();
            for (Country countryDto : dtoList) {
                if (countryRepository.findActiveByIsoCode(countryDto.getIsoCode()).isEmpty()) {
                    countryDto.setStatus(StatusEnum.ACTIVE);
                    countries.add(countryDto);
                }
            }
            countryRepository.saveAll(countries);
        }catch (Exception ex){
            log.error("Error loading countries {}", ex.getMessage());
        }
    }

    private void loadBanks(){
        log.info("**** loading banks ****");
        try (InputStreamReader reader = new InputStreamReader(Objects.requireNonNull(getClass().getResourceAsStream("/master_records/bank.json")))) {
            Bank[] dtoList = gson.fromJson(gson.newJsonReader(reader), Bank[].class);
            List<Bank> banks = new ArrayList<>();
            for (Bank bankDto : dtoList) {
                if (bankRepository.countByCode(bankDto.getCode()) == 0) {
                    bankDto.setCountry(countryRepository.findActiveByIsoCode("RWA").orElse(null));
                    bankDto.setStatus(StatusEnum.ACTIVE);
                    banks.add(bankDto);
                }
            }
            bankRepository.saveAll(banks);
        }catch (Exception ex){
            log.error("Error loading banks {}", ex.getMessage());
        }
    }

    private void createDefaultAdminUser(){
        if(userRepository.findByEmail(adminEmail).isEmpty()){
            log.info("**** creating default admin user ****");
            SignUpDto signUpDto = new SignUpDto();
            signUpDto.setEmail(adminEmail);
            signUpDto.setPassword(adminPassword);
            userService.signUp(signUpDto, RoleEnum.ADMIN);
        }
    }
}
