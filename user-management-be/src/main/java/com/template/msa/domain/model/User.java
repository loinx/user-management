package com.template.msa.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Domain model representing a User in the system.
 * Contains business rules and validation logic.
 */
@Getter
@Setter
@NoArgsConstructor
public class User {
    private Long id;
    private String email;
    private String password;
    private String name;
    private Set<Role> roles = new HashSet<>();
    private boolean enabled = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
    }

    public boolean hasRole(Role role) {
        return this.roles.contains(role);
    }

    public void updateLastModified() {
        this.updatedAt = LocalDateTime.now();
    }
} 