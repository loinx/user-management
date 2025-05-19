package com.template.msa.model.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiValidationError extends ApiSubError {
    private String object;
    private String field;
    private Object rejectedValue;

    public ApiValidationError(String object, String field, Object rejectedValue, String message) {
        this.object = object;
        this.field = field;
        this.rejectedValue = rejectedValue;
        setMessage(message);
    }
} 