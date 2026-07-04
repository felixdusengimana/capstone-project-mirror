package com.pesatone.api.service;

import java.util.List;

public interface CacheService {
    /**
     * Clears a single cache by name, or all caches when name is null/blank.
     * @return the names of the caches that were cleared
     */
    List<String> clear(String name);
}
