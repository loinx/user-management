package com.template.msa.actuator;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * Custom health indicator for the application.
 * Provides additional health information specific to our microservice.
 *
 * @author Template Team
 * @version 1.0
 */
@Component
public class ApplicationHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        try {
            // Add custom health checks here
            return Health.up()
                    .withDetail("app", "Microservice Template")
                    .withDetail("status", "Running")
                    .build();
        } catch (Exception e) {
            return Health.down()
                    .withException(e)
                    .build();
        }
    }
} 