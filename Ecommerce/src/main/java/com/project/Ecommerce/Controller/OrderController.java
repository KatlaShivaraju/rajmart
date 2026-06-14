package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Order;
import com.project.Ecommerce.Service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final
    OrderService service;

    public OrderController(
            OrderService service
    ) {

        this.service =
                service;
    }

    // ===========================
    // PLACE ORDER
    // ===========================
    @PostMapping(
            "/place/{userId}"
    )
    public ResponseEntity<String>
    placeOrder(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(

                service.placeOrder(
                        userId
                )
        );
    }

    // ===========================
    // GET USER ORDERS
    // ===========================
    @GetMapping(
            "/{userId}"
    )
    public ResponseEntity<List<Order>>
    getOrders(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(

                service.getOrders(
                        userId
                )
        );
    }
}
