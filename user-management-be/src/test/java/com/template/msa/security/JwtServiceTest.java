package com.template.msa.security;

import com.template.msa.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private User testUser;
    private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long EXPIRATION = 86400000; // 24 hours

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(jwtService, "secretKey", SECRET_KEY);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", EXPIRATION);

        testUser = new User();
        testUser.setEmail("test@example.com");
    }

    @Test
    void generateToken_ShouldCreateValidToken() {
        // Act
        String token = jwtService.generateToken(testUser);

        // Assert
        assertThat(token).isNotNull();
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtService.getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        assertThat(claims.getSubject()).isEqualTo(testUser.getEmail());
        assertThat(claims.getExpiration()).isAfter(new Date());
    }

    @Test
    void generateToken_WithExtraClaims_ShouldIncludeClaims() {
        // Arrange
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "ADMIN");

        // Act
        String token = jwtService.generateToken(extraClaims, testUser);

        // Assert
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtService.getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        assertThat(claims.get("role")).isEqualTo("ADMIN");
    }

    @Test
    void extractUsername_ShouldReturnEmail() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        String username = jwtService.extractUsername(token);

        // Assert
        assertThat(username).isEqualTo(testUser.getEmail());
    }

    @Test
    void isTokenValid_WithValidToken_ShouldReturnTrue() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        boolean isValid = jwtService.isTokenValid(token, testUser);

        // Assert
        assertThat(isValid).isTrue();
    }

    @Test
    void isTokenValid_WithInvalidUser_ShouldReturnFalse() {
        // Arrange
        String token = jwtService.generateToken(testUser);
        User differentUser = new User();
        differentUser.setEmail("different@example.com");

        // Act
        boolean isValid = jwtService.isTokenValid(token, differentUser);

        // Assert
        assertThat(isValid).isFalse();
    }
} 