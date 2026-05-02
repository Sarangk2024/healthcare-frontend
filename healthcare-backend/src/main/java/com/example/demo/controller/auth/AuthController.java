package com.example.demo.controller.auth;

import com.example.demo.auth.User;
import com.example.demo.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = authService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return authService.authenticateUser(user.getUsername(), user.getPassword())
                .map(authenticatedUser -> {
                    // For now, we'll just return a success message.
                    return ResponseEntity.ok(Collections.singletonMap("message", "Login successful"));
                })
                .orElse(new ResponseEntity<>(Collections.singletonMap("message", "Invalid credentials"), HttpStatus.UNAUTHORIZED));
    }
}