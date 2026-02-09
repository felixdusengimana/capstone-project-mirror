package com.pesatone.api.repository;

import com.pesatone.api.model.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, Long> {
    @Query("select u from Industry  u where u.code = ?1 and u.status = 'ACTIVE'")
    Optional<Industry> findActiveByCode(String code);
}
