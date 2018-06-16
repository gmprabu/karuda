package com.karuda.model;


import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    
    private int expiresIn;

    public JwtAuthenticationResponse(String accessToken,int expire) {
        this.accessToken = accessToken;
        this.expiresIn = expire;
    }
}