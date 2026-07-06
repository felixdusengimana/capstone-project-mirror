package com.pesatone.api.service;

import com.pesatone.api.service.impl.CacheServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CacheServiceImplTest {

    @Mock private CacheManager cacheManager;
    @Mock private Cache creatorSearch;
    @Mock private Cache creator;

    @InjectMocks private CacheServiceImpl cacheService;

    @Test
    void clearsAllCaches_whenNameBlank() {
        when(cacheManager.getCacheNames()).thenReturn(List.of("creatorSearch", "creator"));
        when(cacheManager.getCache("creatorSearch")).thenReturn(creatorSearch);
        when(cacheManager.getCache("creator")).thenReturn(creator);

        List<String> cleared = cacheService.clear(null);

        assertEquals(List.of("creatorSearch", "creator"), cleared);
        verify(creatorSearch).clear();
        verify(creator).clear();
    }

    @Test
    void clearsSingleNamedCache() {
        when(cacheManager.getCache("creatorSearch")).thenReturn(creatorSearch);

        List<String> cleared = cacheService.clear("creatorSearch");

        assertEquals(List.of("creatorSearch"), cleared);
        verify(creatorSearch).clear();
        verify(cacheManager, never()).getCacheNames();
    }

    @Test
    void unknownCacheName_clearsNothing() {
        when(cacheManager.getCache("nope")).thenReturn(null);

        List<String> cleared = cacheService.clear("nope");

        assertTrue(cleared.isEmpty());
    }
}
