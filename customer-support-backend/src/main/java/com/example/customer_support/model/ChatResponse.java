package com.example.customer_support.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {

    private Long id;
    private String customerMessage;
    private String botResponse;
    private LocalDateTime createdAt;
}
