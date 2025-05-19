package com.template.msa.model.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ApiSubError {
    private String message;
} 