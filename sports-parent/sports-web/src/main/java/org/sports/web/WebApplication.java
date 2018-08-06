package org.sports.web;

import org.mybatis.spring.annotation.MapperScan;
import org.sports.core.MapperNameGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication(scanBasePackages = { "org.sports" })
@PropertySources({ @PropertySource(encoding = "UTF-8", value = { "classpath:/config/jdbc.properties" }) })
@MapperScan(value = { "org.sports.core.mapper" }, nameGenerator = MapperNameGenerator.class)
public class WebApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}
}
