package com.project.Ecommerce.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate =
            new RestTemplate();

    public void sendOtpEmail(
            String toEmail,
            String otp
    ) {

        String url =
                "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "api-key",
                apiKey
        );

        String body = """
        {
          "sender": {
            "name": "RajMart",
            "email": "code2placementt@gmail.com"
          },
          "to": [
            {
              "email": "%s"
            }
          ],
          "subject": "RajMart Email Verification",
          "htmlContent": "<h2>Your OTP is: %s</h2><p>This OTP expires soon.</p>"
        }
        """.formatted(
                toEmail,
                otp
        );

        HttpEntity<String> request =
                new HttpEntity<>(
                        body,
                        headers
                );

        try {

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            url,
                            request,
                            String.class
                    );

            System.out.println(
                    "Brevo Response: "
                            + response.getBody()
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Brevo Error: "
                            + e.getMessage()
            );
        }
    }
}
