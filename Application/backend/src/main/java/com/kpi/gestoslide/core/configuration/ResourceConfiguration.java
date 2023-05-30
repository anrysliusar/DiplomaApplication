package com.kpi.gestoslide.core.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class ResourceConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String home = System.getProperty("user.dir");
        String path = "File:" + home + File.separator + "uploads" + File.separator;
        registry
                .addResourceHandler("/api/resource/**")
                .addResourceLocations(path);
    }
}
