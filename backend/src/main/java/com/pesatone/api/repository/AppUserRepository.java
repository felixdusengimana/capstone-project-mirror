package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    @Query("select u from AppUser  u where u.email = lower(?1)" +
            "and u.status = 'ACTIVE'")
    Optional<AppUser> findActiveByEmail(String email);
}
