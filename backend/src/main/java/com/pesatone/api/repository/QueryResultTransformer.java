package com.pesatone.api.repository;

public interface QueryResultTransformer<E, T> {

    T transform(E e);
}