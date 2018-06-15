package com.karuda.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class KarudaException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public KarudaException(String message) {
        super(message);
    }

    public KarudaException(String message, Throwable cause) {
        super(message, cause);
    }
}