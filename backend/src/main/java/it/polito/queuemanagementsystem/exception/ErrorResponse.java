package it.polito.queuemanagementsystem.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private int statusCode;
    private String message;
    private String description;
    private LocalDateTime timestamp;

    public ErrorResponse(int statusCode, String message, String description, LocalDateTime timestamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.description = description;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
