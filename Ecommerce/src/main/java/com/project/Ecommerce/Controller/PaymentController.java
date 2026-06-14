package com.project.Ecommerce.Controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public ResponseEntity<String>
    createOrder(

            @RequestParam
            int amount
    ) {

        try {

            RazorpayClient razorpay =

                    new RazorpayClient(
                            keyId,
                            keySecret
                    );

            JSONObject options =
                    new JSONObject();

            options.put(
                    "amount",
                    amount * 100
            );

            options.put(
                    "currency",
                    "INR"
            );

            options.put(
                    "receipt",
                    "txn_"
                            + System.currentTimeMillis()
            );

            Order order =
                    razorpay.orders
                            .create(
                                    options
                            );

            return ResponseEntity.ok(
                    order.toString()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }
}
