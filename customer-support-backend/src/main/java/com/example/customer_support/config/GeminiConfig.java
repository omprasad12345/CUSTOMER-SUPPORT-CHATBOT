package com.example.customer_support.config;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration(proxyBeanMethods = false)
public class GeminiConfig {

    @Bean
    public Client geminiClient(Environment environment) {
        String apiKey = environment.getProperty("gemini.api.key");

        return Client.builder()
                .apiKey(apiKey)
                .build();
    }
}