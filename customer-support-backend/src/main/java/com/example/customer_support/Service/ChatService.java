package com.example.customer_support.Service;

import com.example.customer_support.Repository.ChatRepository;
import com.example.customer_support.model.ChatMessage;
import com.example.customer_support.model.ChatRequest;
import com.example.customer_support.model.ChatResponse;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private Client geminiClient;

    @Autowired
    private ChatRepository chatRepository;

    @Value("${gemini.model}")
    private String model;

    public ChatResponse sendMessage(ChatRequest request) {

        if (request.getMessage() == null ||
                request.getMessage().isBlank()) {
            throw new IllegalArgumentException(
                    "Message cannot be empty"
            );
        }

        String prompt = """
                You are a helpful and professional AI customer
                support assistant.

                Answer the customer's questions clearly,
                politely and accurately.

                You can answer general questions on different
                topics. If a question requires company-specific
                information that has not been provided, explain
                that you do not have that information instead
                of inventing an answer.

                Keep your answers easy to understand.

                Customer question:
                """ + request.getMessage();

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        model,
                        prompt,
                        null
                );

        String botResponse = response.text();

        if (botResponse == null || botResponse.isBlank()) {
            throw new IllegalStateException(
                    "AI could not generate a response"
            );
        }

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setCustomerMessage(request.getMessage());
        chatMessage.setBotResponse(botResponse);

        ChatMessage savedMessage =
                chatRepository.save(chatMessage);

        return new ChatResponse(
                savedMessage.getId(),
                savedMessage.getCustomerMessage(),
                savedMessage.getBotResponse(),
                savedMessage.getCreatedAt()
        );
    }

    public List<ChatResponse> getAllMessages() {

        return chatRepository.findAll()
                .stream()
                .map(message -> new ChatResponse(
                        message.getId(),
                        message.getCustomerMessage(),
                        message.getBotResponse(),
                        message.getCreatedAt()
                ))
                .toList();
    }
}