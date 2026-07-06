package com.pesatone.api.service;

import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.model.dto.BankDto;
import com.pesatone.api.model.dto.IndustryDto;
import com.pesatone.api.model.entity.Country;
import com.pesatone.api.model.entity.Industry;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.model.pojo.BankResponse;
import com.pesatone.api.model.pojo.IndustryResponse;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import com.pesatone.api.service.impl.ResourceServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResourceServiceImplTest {

    @Mock private IndustryRepository industryRepository;
    @Mock private CountryRepository countryRepository;
    @Mock private BankRepository bankRepository;

    @InjectMocks private ResourceServiceImpl service;

    private IndustryDto industryDto(String name, String code) {
        IndustryDto dto = new IndustryDto();
        dto.setName(name);
        dto.setCode(code);
        return dto;
    }

    @Test
    void createIndustry_normalizesCode_andSavesActive() {
        when(industryRepository.findFirstByCodeIgnoreCase(anyString())).thenReturn(Optional.empty());
        when(industryRepository.save(any(Industry.class))).thenAnswer(i -> i.getArgument(0));

        IndustryResponse res = service.createIndustry(industryDto("Fitness Plue", "fitness plue"));

        ArgumentCaptor<Industry> saved = ArgumentCaptor.forClass(Industry.class);
        verify(industryRepository).save(saved.capture());
        assertEquals("FITNESS_PLUE", saved.getValue().getCode()); // trimmed, upper, spaces -> underscore
        assertEquals(StatusEnum.ACTIVE, saved.getValue().getStatus());
        assertEquals("FITNESS_PLUE", res.code());
    }

    @Test
    void createIndustry_activeDuplicate_throws() {
        Industry existing = new Industry();
        existing.setCode("MUSIC");
        existing.setStatus(StatusEnum.ACTIVE);
        when(industryRepository.findFirstByCodeIgnoreCase(anyString())).thenReturn(Optional.of(existing));

        assertThrows(PesatoneException.class, () -> service.createIndustry(industryDto("Music", "music")));
        verify(industryRepository, never()).save(any());
    }

    @Test
    void createIndustry_revivesDeactivated() {
        Industry deactivated = new Industry();
        deactivated.setId(7L);
        deactivated.setCode("MUSIC");
        deactivated.setStatus(StatusEnum.DEACTIVATED);
        when(industryRepository.findFirstByCodeIgnoreCase(anyString())).thenReturn(Optional.of(deactivated));
        when(industryRepository.save(any(Industry.class))).thenAnswer(i -> i.getArgument(0));

        service.createIndustry(industryDto("Music", "music"));

        ArgumentCaptor<Industry> saved = ArgumentCaptor.forClass(Industry.class);
        verify(industryRepository).save(saved.capture());
        assertEquals(7L, saved.getValue().getId()); // same row revived, not a new one
        assertEquals(StatusEnum.ACTIVE, saved.getValue().getStatus());
    }

    @Test
    void deactivateIndustry_setsDeactivated() {
        Industry industry = new Industry();
        industry.setId(3L);
        industry.setStatus(StatusEnum.ACTIVE);
        when(industryRepository.findById(3L)).thenReturn(Optional.of(industry));

        service.deactivateIndustry(3L);

        assertEquals(StatusEnum.DEACTIVATED, industry.getStatus());
        verify(industryRepository).save(industry);
    }

    @Test
    void getIndustries_returnsActiveOnly() {
        Industry active = new Industry();
        active.setName("A"); active.setCode("A"); active.setStatus(StatusEnum.ACTIVE);
        Industry gone = new Industry();
        gone.setName("B"); gone.setCode("B"); gone.setStatus(StatusEnum.DEACTIVATED);
        when(industryRepository.findAll(any(org.springframework.data.domain.Sort.class)))
                .thenReturn(List.of(active, gone));

        List<IndustryResponse> res = service.getIndustries();

        assertEquals(1, res.size());
        assertEquals("A", res.get(0).code());
    }

    @Test
    void createBank_resolvesCountry_andReturnsCountryName() {
        Country rwanda = new Country();
        rwanda.setName("Rwanda");
        rwanda.setIsoCode("RWA");
        when(countryRepository.findFirstByIsoCodeIgnoreCase("RWA")).thenReturn(Optional.of(rwanda));
        when(bankRepository.findByCode(anyString())).thenReturn(Optional.empty());
        when(bankRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        BankDto dto = new BankDto();
        dto.setName("Bank of Kigali");
        dto.setCode("bk");
        dto.setCountryIsoCode("RWA");

        BankResponse res = service.createBank(dto);

        assertEquals("BK", res.code());
        assertEquals("Rwanda", res.countryName());
    }

    @Test
    void createBank_unknownCountry_throws() {
        when(countryRepository.findFirstByIsoCodeIgnoreCase(anyString())).thenReturn(Optional.empty());
        BankDto dto = new BankDto();
        dto.setName("X"); dto.setCode("x"); dto.setCountryIsoCode("ZZZ");

        assertThrows(PesatoneException.class, () -> service.createBank(dto));
        verify(bankRepository, never()).save(any());
    }
}
