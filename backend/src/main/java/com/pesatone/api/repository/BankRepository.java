package com.pesatone.api.repository;

import com.pesatone.api.model.entity.Bank;
import com.pesatone.api.model.pojo.BankPojo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {
    @Query("select new com.pesatone.api.model.pojo.BankPojo(b.id, b.name, b.code) from Bank  b")
    List<BankPojo> findAllSorted(Sort sort);

    @Query("select count(u.id) from Bank u where lower(u.code) = lower(?1)")
    long countByCode(String code);

    Optional<Bank> findByCode(String code);
}
