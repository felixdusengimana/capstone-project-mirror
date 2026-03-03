package com.pesatone.api;

import com.pesatone.api.configuration.AppConfiguration;
import com.pesatone.api.configuration.OpenApiConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@Import({OpenApiConfiguration.class, AppConfiguration.class})
public class PesatoneApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PesatoneApiApplication.class, args);
	}

}
