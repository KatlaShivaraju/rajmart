package com.project.Ecommerce.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

//    @Value("${spring.mail.username}")
//    private String fromEmail;

    public void sendOtpEmail(

            String toEmail,

            String otp
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

//

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

            System.out.println(
                    "Email sent successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Email failed: "
                            + e.getMessage()
            );
        }
    }
}
