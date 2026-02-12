package com.pesatone.api.repository;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/
@Repository
class AppRepositoryImpl implements AppRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CriteriaBuilderFactory criteriaBuilderFactory;

    @Transactional(readOnly = true)
    @Override
    public <E> long count(Class<E> type) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = cb.createQuery(Long.class);
        Root<E> root = criteriaQuery.from(type);
        criteriaQuery.select(cb.count(root));
        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }

    @Transactional(readOnly = true)
    @Override
    public <E> Optional<E> findById(Class<E> type, Object id) {
        return Optional.ofNullable(entityManager.find(type, id));
    }

    @Transactional(readOnly = true)
    @Override
    public <E> List<E> findByIds(Class<E> type, Collection<Object> ids) {
        if (ids.isEmpty()) {
            return Collections.emptyList();
        }
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<E> clientCriteriaQuery = criteriaBuilder.createQuery(type);
        Root<E> clientRoot = clientCriteriaQuery.from(type);
        clientCriteriaQuery.where(clientRoot.get("id").in(ids));
        return entityManager.createQuery(clientCriteriaQuery).getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public <T> T unproxy(Class<T> tClass, T entity) {
        if (!Hibernate.isInitialized(entity)) {
            return findById(tClass, ((HibernateProxy) entity).getHibernateLazyInitializer().getIdentifier()).orElse(null);
        }
        return entity;
    }

    @Override
    @Transactional
    public <E> E persist(E e) {
        entityManager.persist(e);
        return e;
    }

    @Override
    @Transactional
    public <E> E merge(E e) {
        return entityManager.merge(e);
    }

    @Override
    public void remove(Object e) {
        entityManager.remove(e);
    }

    @Override
    public <E> JPAQuery<E> startJPAQuery(EntityPath<E> entityPath) {
        return new JPAQuery<E>(entityManager).from(entityPath);
    }

    @Transactional(readOnly = true)
    @Override
    public <E> Optional<E> findFirst(Class<E> type) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<E> criteria = builder.createQuery(type);
        Root<E> from = criteria.from(type);
        criteria.select(from);
        try {
            return Optional.ofNullable(entityManager.createQuery(criteria).setMaxResults(1).getSingleResult());
        } catch (final NoResultException nre) {
            return Optional.empty();
        }
    }

    @Transactional(readOnly = true)
    @Override
    public <E> Optional<E> findFirstByField(Class<E> type, String columnName, Object value) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<E> criteria = builder.createQuery(type);
        Root<E> from = criteria.from(type);
        criteria.select(from);
        criteria.where(builder.equal(from.get(columnName), value));
        try {
            return Optional.ofNullable(entityManager.createQuery(criteria).setMaxResults(1).getSingleResult());
        } catch (final NoResultException nre) {
            return Optional.empty();
        }
    }

}
