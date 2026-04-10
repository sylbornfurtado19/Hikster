package com.hikster.controllers;

import com.hikster.models.User;
import com.hikster.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allows your frontend to talk to this backend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Error: Email already exists!";
        }
        userRepository.save(user);
        return "Success: User registered!";
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginDetails) {
        User user = userRepository.findByEmail(loginDetails.getEmail());
        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return user; // Return user data if password matches
        }
        return null; // Return nothing if login fails
    }
}