package com.template.msa.controller;

import com.template.msa.model.User;
import com.template.msa.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing users.
 * Provides endpoints for CRUD operations on users.
 *
 * @author Template Team
 * @version 1.0
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET /api/users : Get all users.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of users
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    /**
     * GET /api/users/{id} : Get user by ID.
     *
     * @param id the ID of the user to retrieve
     * @return the ResponseEntity with status 200 (OK) and the user, or status 404 (Not Found)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id)")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    /**
     * POST /api/users : Create a new user.
     *
     * @param user the user to create
     * @return the ResponseEntity with status 201 (Created) and the created user
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }

    /**
     * PUT /api/users/{id} : Update an existing user.
     *
     * @param id the ID of the user to update
     * @param user the user details to update
     * @return the ResponseEntity with status 200 (OK) and the updated user
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id)")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.update(id, user));
    }

    /**
     * DELETE /api/users/{id} : Delete a user.
     *
     * @param id the ID of the user to delete
     * @return the ResponseEntity with status 204 (No Content)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/users/me : Get current user.
     *
     * @return the ResponseEntity with status 200 (OK) and the current user
     */
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
} 