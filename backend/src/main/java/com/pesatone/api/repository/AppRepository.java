package com.pesatone.api.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/
public interface AppRepository {

    <E> long count(Class<E> type);

    @Transactional(readOnly = true)
    <E> Optional<E> findFirst(Class<E> type);

    <E> Optional<E> findById(Class<E> type, Object id);

    <E> E persist(E e);

    <E> E merge(E e);

    void remove(Object e);

    <E> List<E> findByIds(Class<E> type, Collection<Object> ids);

    <T> T unproxy(Class<T> tClass, T entity);

//    <E> JPAQuery<E> startJPAQuery(EntityPath<E> entityPath);

    @Transactional(readOnly = true)
    <E> Optional<E> findFirstByField(Class<E> type, String columnName, Object value);

}
