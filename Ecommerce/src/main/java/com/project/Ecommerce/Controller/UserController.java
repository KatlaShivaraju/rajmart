package com.project.Ecommerce.Controller;

import com.project.Ecommerce.DTO.LoginRequest;
import com.project.Ecommerce.DTO.RegisterRequest;
import com.project.Ecommerce.Model.User;
import com.project.Ecommerce.Repository.UserRepo;
import com.project.Ecommerce.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175",
                "http://localhost:5176",
                "http://localhost:5177",
                "http://localhost:5178"
        }
)
public class UserController {

    @Autowired
    private UserService
            userService;

    // ==========================
    // SEND OTP
    // ==========================

    @PostMapping("/send-otp")
    public ResponseEntity<String>
    sendOtp(

            @RequestParam
            String email
    ) {

        return ResponseEntity.ok(

                userService
                        .sendOtp(
                                email
                        )
        );
    }




    // ==========================
    // VERIFY OTP
    // ==========================

    @PostMapping("/verify-otp")
    public ResponseEntity<String>
    verifyOtp(

            @RequestParam
            String email,

            @RequestParam
            String otp
    ) {

        return ResponseEntity.ok(

                userService
                        .verifyOtp(

                                email,

                                otp
                        )
        );
    }

    // ==========================
    // REGISTER
    // ==========================

    @PostMapping("/register")
    public ResponseEntity<String>
    register(

            @RequestBody
            RegisterRequest request
    ) {

        return ResponseEntity.ok(

                userService
                        .register(
                                request
                        )
        );
    }

    // ==========================
    // LOGIN
    // ==========================

    @PostMapping("/login")
    public ResponseEntity<User>
    login(

            @RequestBody
            LoginRequest request
    ) {

        return ResponseEntity.ok(

                userService
                        .login(
                                request
                        )
        );
    }
}