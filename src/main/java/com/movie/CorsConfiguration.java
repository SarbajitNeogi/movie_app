package com.movie;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow CORS for all endpoints.
                .allowedOrigins("http://localhost:5173") // Allow requests from this origin.
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods.
                .allowedHeaders("*"); // Allowed request headers.
    }
}