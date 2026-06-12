package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Service.UserService;
import com.project.Ecommerce.DTO.LoginRequest;
import com.project.Ecommerce.DTO.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(
                userService.register(request)
        );
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                userService.login(request)
        );
    }
}
