package com.orkestrascs.currencyExchange.controller;

import com.orkestrascs.currencyExchange.model.UserCredentials;
import com.orkestrascs.currencyExchange.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@RestController() @CrossOrigin(origins="http://localhost:3000", maxAge = 3600)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String createUser(@RequestBody UserCredentials userCredentials){
        return userService.createUser(userCredentials).getUsername();
    }

    @GetMapping("/login")
    public String login(@AuthenticationPrincipal UserCredentials credentials){
        return credentials.getUsername();
    }
}
