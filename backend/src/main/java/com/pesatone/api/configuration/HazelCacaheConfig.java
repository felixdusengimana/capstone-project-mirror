package com.pesatone.api.configuration;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

@Configuration
@EnableCaching
public class HazelCacaheConfig {
	   @Bean
	    public Config hazelCastConfig() {
	        return new Config()
	                .setInstanceName("pesatone-hazelcast")
	                .addMapConfig(new MapConfig()
	                        .setName("paymentTransaction")
	                        .setTimeToLiveSeconds(1800));
	    }

	    @Bean
	    public HazelcastInstance hazelcastInstance(Config config) {
	        return Hazelcast.newHazelcastInstance(config);
	    }
}
