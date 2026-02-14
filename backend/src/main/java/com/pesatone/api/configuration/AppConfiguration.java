package com.pesatone.api.configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import org.hibernate.proxy.AbstractLazyInitializer;
import org.hibernate.proxy.map.MapLazyInitializer;
import org.hibernate.proxy.pojo.BasicLazyInitializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.util.List;

/**
 * @author Felix Dusengimana <phelixdusengimana@gmail.com>
 */

@Configuration
@ComponentScan({
        "com.pesatone.api.service",
        "com.pesatone.api.model.validator"
})
@EnableJpaRepositories({"com.pesatone.api.repository"})
public class AppConfiguration implements WebMvcConfigurer {
    @Value("${application.cloudinary.name}")
    private String cloudinaryName;
    @Value("${application.cloudinary.api-key}")
    private String cloudinaryApiKey;
    @Value("${application.cloudinary.api-secret}")
    private String cloudinaryApiSecret;
    @Value("${application.mailjet.public-key}")
    private String mailJetPublicKey;
    @Value("${application.mailjet.secret-key}")
    private String mailJetSecretKey;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(customJackson2HttpMessageConverter());
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule simpleModule = new SimpleModule();
        StdDateFormat isoDate = new StdDateFormat();
        simpleModule.addSerializer(new StdSerializer<>(AbstractLazyInitializer.class) {
            @Override
            public void serialize(AbstractLazyInitializer value, JsonGenerator gen, SerializerProvider provider) throws IOException {
                gen.writeNull();
            }
        });
        simpleModule.addSerializer(new StdSerializer<>(BasicLazyInitializer.class) {
            @Override
            public void serialize(BasicLazyInitializer value, JsonGenerator gen, SerializerProvider provider) throws IOException {
                gen.writeNull();
            }
        });
        simpleModule.addSerializer(new StdSerializer<>(MapLazyInitializer.class) {
            @Override
            public void serialize(MapLazyInitializer value, JsonGenerator gen, SerializerProvider provider) throws IOException {
                gen.writeNull();
            }
        });
        simpleModule.addDeserializer(String.class, new JsonDeserializer<>() {
            @Override
            public String deserialize(JsonParser jsonParser, DeserializationContext ctx) throws IOException {
                return jsonParser.getValueAsString().trim();
            }
        });
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.setDateFormat(isoDate);
        objectMapper.registerModule(simpleModule);

        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.registerModule(new Jdk8Module());

        return objectMapper;
    }

    @Bean
    public MappingJackson2HttpMessageConverter customJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        jsonConverter.setObjectMapper(objectMapper());
        return jsonConverter;
    }

    @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudinaryName,
                "api_key", cloudinaryApiKey,
                "api_secret",cloudinaryApiSecret,
                "shorten", true));
    }

    @Bean
    public MailjetClient mailjetClient() {
        ClientOptions options = ClientOptions.builder()
                .apiKey(mailJetPublicKey)
                .apiSecretKey(mailJetSecretKey)
                .build();

        return new MailjetClient(options);
    }
}
