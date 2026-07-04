package com.pesatone.api.service.impl;

import com.pesatone.api.service.CacheService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CacheServiceImpl implements CacheService {
    private final CacheManager cacheManager;

    @Override
    public List<String> clear(String name) {
        List<String> targets = StringUtils.isBlank(name)
                ? new ArrayList<>(cacheManager.getCacheNames())
                : List.of(name);

        List<String> cleared = new ArrayList<>();
        for (String cacheName : targets) {
            Cache cache = cacheManager.getCache(cacheName);
            if (cache != null) {
                cache.clear();
                cleared.add(cacheName);
            }
        }
        return cleared;
    }
}
