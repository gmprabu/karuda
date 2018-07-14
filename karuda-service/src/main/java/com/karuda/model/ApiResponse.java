package com.karuda.model;

import lombok.Data;

@Data
public class ApiResponse {
    private Boolean success;
    private String message;
    
    private Object responseObject;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public ApiResponse(Boolean success, String message,Object obj) {
        this.success = success;
        this.message = message;
        this.responseObject = obj;
    }
}