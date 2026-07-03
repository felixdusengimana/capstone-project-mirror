package com.pesatone.api.repository;

import com.pesatone.api.model.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("select u from Country  u where u.isoCode = ?1 and u.status = 'ACTIVE'")
    Optional<Country> findActiveByIsoCode(String code);

    Optional<Country> findFirstByIsoCodeIgnoreCase(String isoCode);
}
