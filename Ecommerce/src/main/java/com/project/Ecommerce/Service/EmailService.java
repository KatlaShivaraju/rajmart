package com.project.Ecommerce.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(

            String toEmail,

            String otp
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(
                toEmail
        );

        message.setSubject(
                "RajMart Email Verification"
        );

        message.setText(

                "Welcome to RajMart!\n\n"

                        + "Your OTP is: "

                        + otp

                        + "\n\nThis OTP expires soon."
        );

        mailSender.send(
                message
        );
    }
}
