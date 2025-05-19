package com.template.msa.dto;

import com.template.msa.model.error.ApiValidationError;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private T data;
    private String message;
    private int status;
    private List<ApiValidationError> validationErrors;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, "Success", HttpStatus.OK.value(), null);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message, HttpStatus.OK.value(), null);
    }

    public static <T> ApiResponse<T> error(String message, HttpStatus status) {
        return new ApiResponse<>(null, message, status.value(), null);
    }

    public static <T> ApiResponse<T> validationError(String message, List<ApiValidationError> validationErrors) {
        return new ApiResponse<>(null, message, HttpStatus.BAD_REQUEST.value(), validationErrors);
    }
} 