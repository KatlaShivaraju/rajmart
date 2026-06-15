package com.project.Ecommerce.Service;

import com.project.Ecommerce.DTO.LoginRequest;
import com.project.Ecommerce.DTO.RegisterRequest;
import com.project.Ecommerce.Model.User;
import com.project.Ecommerce.Repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private EmailService
            emailService;

    // ==========================
    // SEND OTP
    // ==========================

    public String sendOtp(String email) {

        String otp =
                String.valueOf(
                        (int) (
                                Math.random() * 900000
                        ) + 100000
                );

        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);

        if (user == null) {

            user = new User();
            user.setEmail(email);
            user.setName("TEMP_USER");
            user.setPassword("TEMP_PASSWORD");
            user.setRole("USER");
        }

        user.setOtp(otp);
        user.setVerified(false);

        userRepository.save(user);

        System.out.println(
                "OTP for " + email +
                        " : " + otp
        );

        return otp;
    }
    // ==========================
    // VERIFY OTP
    // ==========================

    public String verifyOtp(

            String email,

            String otp
    ) {

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User not found"
                                )
                        );

        if (

                user.getOtp()
                        == null

                        ||

                        !user.getOtp()
                                .equals(
                                        otp
                                )
        ) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        user.setVerified(
                true
        );

        user.setOtp(
                null
        );

        userRepository.save(
                user
        );

        return
                "Email Verified";
    }

    // ==========================
    // REGISTER
    // ==========================

    public String register(
            RegisterRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Please verify email first"
                                )
                        );

        // EMAIL MUST BE VERIFIED

        if (!user.isVerified()) {

            throw new RuntimeException(
                    "Please verify email first"
            );
        }

        // OVERWRITE TEMP VALUES
        // WITH REAL USER DATA

        user.setName(
                request.getName()
        );

        user.setPassword(
                request.getPassword()
        );

        user.setRole(
                "USER"
        );

        userRepository.save(
                user
        );

        return
                "User Registered Successfully";
    }

    // ==========================
    // LOGIN
    // ==========================

    public User login(

            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User not found"
                                )
                        );

        if (

                !user.getPassword()
                        .equals(
                                request.getPassword()
                        )
        ) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        if (

                !user.isVerified()
        ) {

            throw new RuntimeException(
                    "Please verify your email"
            );
        }

        return user;
    }
}