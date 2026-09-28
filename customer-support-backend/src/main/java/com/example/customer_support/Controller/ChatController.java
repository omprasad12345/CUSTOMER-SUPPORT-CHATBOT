package com.example.customer_support.Controller;

import com.example.customer_support.model.ChatRequest;
import com.example.customer_support.model.ChatResponse;
import com.example.customer_support.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<?> sendMessage(
            @RequestBody ChatRequest request) {
        try {
            ChatResponse response = chatService.sendMessage(request);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatResponse>> getHistory() {
        return ResponseEntity.ok(
                chatService.getAllMessages()
        );
    }
}
