package com.pesatone.api.configuration;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
public class RateLimitFilter extends OncePerRequestFilter {
    @Value("${application.ratelimitMaxRequest}")
    private int MAX_REQUESTS;
    private static final Duration REFILL_DURATION = Duration.ofMinutes(1);
    private static final Set<String> CRAWLER_SIGNATURES = Set.of("Googlebot",
            "Bingbot",
            "Slurp",
            "DuckDuckBot",
            "Baiduspider",
            "YandexBot",
            "Sogou",
            "Exabot",
            "facebot",
            "ia_archiver",
            "MJ12bot",
            "SemrushBot",
            "AhrefsBot",
            "DotBot",
            "SeznamBot",
            "rogerbot",
            "spbot",
            "SiteAuditBot",
            "MegaIndex",
            "Scrapy",
            "python-requests",
            "Apache-HttpClient",
            "Go-http-client",
            "okhttp",
            "curl",
            "wget",
            "libwww-perl",
            "java",
            "lwp-trivial",
            "pycurl",
            "HTTrack",
            "Nutch",
            "Zgrab",
            "masscan",
            "dirbuster",
            "Fuzzer",
            "sqlmap",
            "wpscan",
            "Nikto",
            "Arachni",
            "httperf",
            "bench",
            "ApacheBench",
            "loader",
            "boom",
            "wrk",
            "siege",
            "bombard",
            "locust",
            "k6",
            "hey",
            "test-agent");

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket resolveBucket(String ip) {
        return buckets.computeIfAbsent(ip, key -> Bucket.builder()
                .addLimit(Bandwidth.builder()
                        .capacity(MAX_REQUESTS)
                        .refillGreedy(MAX_REQUESTS, REFILL_DURATION)
                        .build())
                .build());
    }

    /**
     * Allow pokemoney callback to bypass crawling as they send back header with pytj
     */
    private boolean isWebhookPath(String path) {

        if (path == null) {
            return false;
        }

        return path.contains("/poketmoney/callback");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (isWebhookPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            log.info("Webhook request detected: {}", request.getRequestURI());
            return;
        }

        String userAgent = request.getHeader("User-Agent");
        if (isCrawler(userAgent)) {
            log.error("Crawler detected: {}", userAgent);
            response.setStatus(403);
            response.getWriter().write("It seems we can't handle your requests at the moment.");
            response.getWriter().flush();
            return;
        }

        String ip = request.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            log.error("Rate limit reached for IP: {}", ip);
            response.setStatus(429);
            response.getWriter().write("It seems we can't handle your requests at the moment. Please try again");
            response.getWriter().flush();
        }
    }

    private boolean isCrawler(String userAgent) {
        if (userAgent == null || userAgent.isEmpty())
            return false;
        String uaLower = userAgent.toLowerCase();
        return CRAWLER_SIGNATURES.stream().anyMatch(uaLower::contains);
    }
}
