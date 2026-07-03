package com.pesatone.api.service.impl;

import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.BankDto;
import com.pesatone.api.model.dto.CountryDto;
import com.pesatone.api.model.dto.IndustryDto;
import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.entity.Country;
import com.pesatone.api.model.entity.Industry;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.model.pojo.BankResponse;
import com.pesatone.api.model.pojo.CountryResponse;
import com.pesatone.api.model.pojo.IndustryResponse;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import com.pesatone.api.service.ResourceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceServiceImpl implements ResourceService {
    private final IndustryRepository industryRepository;
    private final CountryRepository countryRepository;
    private final BankRepository bankRepository;

    /* ===================== Industries ===================== */

    @Override
    public List<IndustryResponse> getIndustries() {
        return industryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .filter(i -> i.getStatus() == StatusEnum.ACTIVE)
                .map(IndustryResponse::from)
                .toList();
    }

    @Override
    public IndustryResponse createIndustry(IndustryDto dto) {
        dto.setCode(normalizeCode(dto.getCode()));
        Industry industry = industryRepository.findFirstByCodeIgnoreCase(dto.getCode())
                .map(existing -> {
                    if (existing.getStatus() == StatusEnum.ACTIVE) {
                        throw new PesatoneException("An industry with this code already exists");
                    }
                    return existing; // revive a previously deactivated record
                })
                .orElseGet(Industry::new);
        industry.setName(trimName(dto.getName()));
        industry.setCode(dto.getCode());
        industry.setStatus(StatusEnum.ACTIVE);
        return IndustryResponse.from(industryRepository.save(industry));
    }

    @Override
    public IndustryResponse updateIndustry(Long id, IndustryDto dto) {
        dto.setCode(normalizeCode(dto.getCode()));
        Industry industry = industryRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Industry not found"));
        industryRepository.findFirstByCodeIgnoreCase(dto.getCode()).ifPresent(found -> {
            if (!found.getId().equals(id)) {
                throw new PesatoneException("Another industry with this code already exists");
            }
        });
        industry.setName(trimName(dto.getName()));
        industry.setCode(dto.getCode());
        return IndustryResponse.from(industryRepository.save(industry));
    }

    @Override
    public void deactivateIndustry(Long id) {
        Industry industry = industryRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Industry not found"));
        industry.setStatus(StatusEnum.DEACTIVATED);
        industryRepository.save(industry);
    }

    /* ===================== Countries ===================== */

    @Override
    public List<CountryResponse> getCountries() {
        return countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .filter(c -> c.getStatus() == StatusEnum.ACTIVE)
                .map(CountryResponse::from)
                .toList();
    }

    @Override
    public CountryResponse createCountry(CountryDto dto) {
        dto.setIsoCode(normalizeCode(dto.getIsoCode()));
        Country country = countryRepository.findFirstByIsoCodeIgnoreCase(dto.getIsoCode())
                .map(existing -> {
                    if (existing.getStatus() == StatusEnum.ACTIVE) {
                        throw new PesatoneException("A country with this ISO code already exists");
                    }
                    return existing; // revive a previously deactivated record
                })
                .orElseGet(Country::new);
        applyCountry(country, dto);
        country.setStatus(StatusEnum.ACTIVE);
        return CountryResponse.from(countryRepository.save(country));
    }

    @Override
    public CountryResponse updateCountry(Long id, CountryDto dto) {
        dto.setIsoCode(normalizeCode(dto.getIsoCode()));
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Country not found"));
        countryRepository.findFirstByIsoCodeIgnoreCase(dto.getIsoCode()).ifPresent(found -> {
            if (!found.getId().equals(id)) {
                throw new PesatoneException("Another country with this ISO code already exists");
            }
        });
        applyCountry(country, dto);
        return CountryResponse.from(countryRepository.save(country));
    }

    @Override
    public void deactivateCountry(Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Country not found"));
        country.setStatus(StatusEnum.DEACTIVATED);
        countryRepository.save(country);
    }

    private void applyCountry(Country country, CountryDto dto) {
        country.setName(trimName(dto.getName()));
        country.setIsoCode(dto.getIsoCode());
        country.setCountryCode(dto.getCountryCode());
        country.setCurrency(dto.getCurrency());
    }

    /* ===================== Banks ===================== */

    @Override
    public List<BankResponse> getBanks() {
        return bankRepository.findAllAsResponse(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .filter(b -> b.status() == StatusEnum.ACTIVE)
                .toList();
    }

    @Override
    public BankResponse createBank(BankDto dto) {
        dto.setCode(normalizeCode(dto.getCode()));
        Country country = resolveCountry(dto.getCountryIsoCode());
        Bank bank = bankRepository.findByCode(dto.getCode())
                .map(existing -> {
                    if (existing.getStatus() == StatusEnum.ACTIVE) {
                        throw new PesatoneException("A bank with this code already exists");
                    }
                    return existing; // revive a previously deactivated record
                })
                .orElseGet(Bank::new);
        bank.setName(trimName(dto.getName()));
        bank.setCode(dto.getCode());
        bank.setCountry(country);
        bank.setStatus(StatusEnum.ACTIVE);
        return toBankResponse(bankRepository.save(bank), country);
    }

    @Override
    public BankResponse updateBank(Long id, BankDto dto) {
        dto.setCode(normalizeCode(dto.getCode()));
        Bank bank = bankRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Bank not found"));
        Optional<Bank> existing = bankRepository.findByCode(dto.getCode());
        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            throw new PesatoneException("A bank with this code already exists");
        }
        Country country = resolveCountry(dto.getCountryIsoCode());
        bank.setName(trimName(dto.getName()));
        bank.setCode(dto.getCode());
        bank.setCountry(country);
        return toBankResponse(bankRepository.save(bank), country);
    }

    @Override
    public void deactivateBank(Long id) {
        Bank bank = bankRepository.findById(id)
                .orElseThrow(() -> new PesatoneNotFoundException("Bank not found"));
        bank.setStatus(StatusEnum.DEACTIVATED);
        bankRepository.save(bank);
    }

    private Country resolveCountry(String isoCode) {
        return countryRepository.findFirstByIsoCodeIgnoreCase(isoCode)
                .orElseThrow(() -> new PesatoneException("Country with ISO code '" + isoCode + "' does not exist"));
    }

    private BankResponse toBankResponse(Bank bank, Country country) {
        return new BankResponse(bank.getId(), bank.getName(), bank.getCode(), bank.getStatus(),
                country != null ? country.getName() : null,
                country != null ? country.getIsoCode() : null);
    }

    private String normalizeCode(String value) {
        if (value == null) {
            return null;
        }
        return value.trim()                  // never starts/ends with whitespace
                .toUpperCase()
                .replaceAll("\\s+", "_")      // spaces become single underscores
                .replaceAll("[^A-Z0-9_]", "") // strip anything that isn't a letter, digit or underscore
                .replaceAll("_+", "_")        // collapse repeated underscores
                .replaceAll("^_+|_+$", "");   // no leading/trailing underscore
    }

    private String trimName(String name) {
        return name == null ? null : name.trim();
    }
}
