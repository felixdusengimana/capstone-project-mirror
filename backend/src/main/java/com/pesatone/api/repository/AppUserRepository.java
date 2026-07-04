package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    @Query("select u from AppUser  u where u.email = lower(?1)" +
            "and u.status <> 'DELETED'")
    Optional<AppUser> findByEmail(String email);

    @Query("select u from AppUser  u where u.email = lower(?1)" +
            "and u.status = 'ACTIVE'")
    Optional<AppUser> findActiveByEmail(String email);

    @Query("select u from AppUser  u where u.username = lower(?1) and u.role = ?2 and u.status = 'ACTIVE'")
    Optional<AppUser> findActiveByUserNameAndRole(String username,RoleEnum role);

    @Query("select u from AppUser  u where u.username = lower(?1)")
    Optional<AppUser> findByUserName(String username);

    // fast existence check (SELECT 1, hits the unique index) for username availability
    @Query("select case when count(u) > 0 then true else false end from AppUser u where u.username = lower(?1)")
    boolean usernameExists(String username);

    // which of these candidate usernames are already taken (single query, for suggestions)
    @Query("select u.username from AppUser u where u.username in ?1")
    java.util.Set<String> findTakenUsernames(java.util.Collection<String> usernames);

    @Query("select u from AppUser u left join fetch u.country " +
            "left join fetch u.industry " +
            "where u.id = ?1 " +
            "and u.status = 'ACTIVE'")
    Optional<AppUser> findActiveById(Long id);

    @Query("select u from AppUser  u where u.id = ?1 and u.role = ?2 " +
            "and u.status = 'ACTIVE'")
    Optional<AppUser> findActiveByIdAndRole(Long id, RoleEnum role);
}
