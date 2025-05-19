# API Specification

## Overview
This document provides detailed information about the REST API endpoints available in the microservice template.

## Base URL
```
http://localhost:8080/api
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

Request body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

Response (200 OK):
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /auth/login
```

Request body:
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

Response (200 OK):
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Management

#### Get All Users
```http
GET /users
```

Response (200 OK):
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "USER",
        "createdAt": "2024-01-01T00:00:00",
        "updatedAt": "2024-01-01T00:00:00"
    }
]
```

#### Get User by ID
```http
GET /users/{id}
```

Response (200 OK):
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
}
```

#### Create User
```http
POST /users
```

Request body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

Response (200 OK):
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
}
```

#### Delete User
```http
DELETE /users/{id}
```

Response (204 No Content)

## Error Responses

### 400 Bad Request
```json
{
    "status": "BAD_REQUEST",
    "message": "Invalid request parameters",
    "subErrors": {
        "email": "Invalid email format",
        "password": "Password must be between 8 and 20 characters"
    }
}
```

### 401 Unauthorized
```json
{
    "status": "UNAUTHORIZED",
    "message": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
    "status": "FORBIDDEN",
    "message": "Access forbidden"
}
```

### 404 Not Found
```json
{
    "status": "NOT_FOUND",
    "message": "Resource not found with id: 999"
}
```

### 409 Conflict
```json
{
    "status": "CONFLICT",
    "message": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
    "status": "INTERNAL_SERVER_ERROR",
    "message": "An internal server error occurred"
}
```

## Internationalization

The API supports internationalized error messages in English and Japanese. Set the `Accept-Language` header to specify the desired language:
- `en` for English (default)
- `ja` for Japanese

Example:
```http
Accept-Language: ja
```

## Data Models

### User
```json
{
    "id": "Long",
    "name": "String",
    "email": "String",
    "password": "String",
    "role": "Enum(USER, ADMIN)",
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
}
```

### LoginRequest
```json
{
    "email": "String",
    "password": "String"
}
```

## Validation Rules

### User
- name: Required, 2-50 characters
- email: Required, valid email format, unique
- password: Required, 8-20 characters
- role: Optional, defaults to USER

### LoginRequest
- email: Required, valid email format
- password: Required, non-empty

## Rate Limiting
The API implements rate limiting to prevent abuse. Current limits:
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

## Security
- All endpoints except `/auth/register` and `/auth/login` require authentication
- Passwords are hashed using BCrypt
- JWT tokens expire after 24 hours
- HTTPS is required in production 