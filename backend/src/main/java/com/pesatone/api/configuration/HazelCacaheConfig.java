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
		Config config = new Config()
				.setInstanceName("pesatone-hazelcast")
				.addMapConfig(new MapConfig()
						.setName("paymentTransaction")
						.setTimeToLiveSeconds(1800))
				.addMapConfig(new MapConfig()
						.setName("creator")
						.setTimeToLiveSeconds(2880));

		config.getNetworkConfig().getJoin().getMulticastConfig().setEnabled(false);
		config.getNetworkConfig().getJoin().getTcpIpConfig().setEnabled(false);
		return config;
	}

	@Bean
	public HazelcastInstance hazelcastInstance(Config config) {
		return Hazelcast.newHazelcastInstance(config);
	}
}
