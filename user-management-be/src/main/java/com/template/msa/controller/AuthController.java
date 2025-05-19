package com.template.msa.controller;

import com.template.msa.model.User;
import com.template.msa.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for handling authentication operations.
 * Provides endpoints for user registration and login.
 *
 * @author Template Team
 * @version 1.0
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    /**
     * POST /api/auth/register : Register a new user.
     *
     * @param user the user to register
     * @return ResponseEntity with status 200 (OK) and the JWT token in body
     * @response 200 User registered successfully
     * @response 400 Bad Request - Invalid user data
     * @response 409 Conflict - Email already exists
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.createUser(user);
        
        String token = jwtService.generateToken(savedUser);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/login : Authenticate a user and get JWT token.
     *
     * @param request the login request containing email and password
     * @return ResponseEntity with status 200 (OK) and the JWT token in body
     * @response 200 User authenticated successfully
     * @response 400 Bad Request - Invalid credentials
     * @response 401 Unauthorized - Invalid credentials
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        User user = userService.findByEmail(request.getEmail());
        String token = jwtService.generateToken(user);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        
        return ResponseEntity.ok(response);
    }
} 