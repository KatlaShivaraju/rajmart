package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Cart;
import com.project.Ecommerce.Service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // ===========================
    // ADD TO CART
    // ===========================
    @PostMapping("/add")
    public ResponseEntity<Cart>
    addToCart(

            @RequestParam
            Integer userId,

            @RequestParam
            Integer productId,

            @RequestParam
            int quantity
    ) {

        return ResponseEntity.ok(

                cartService
                        .addToCart(
                                userId,
                                productId,
                                quantity
                        )
        );
    }

    // ===========================
    // GET USER CART
    // ===========================
    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>>
    getCart(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(

                cartService
                        .getCart(
                                userId
                        )
        );
    }

    // ===========================
    // REMOVE CART ITEM
    // ===========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    removeItem(

            @PathVariable
            Long id
    ) {

        try {

            return ResponseEntity.ok(

                    cartService
                            .removeItem(
                                    id
                            )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }

    // ===========================
    // UPDATE QUANTITY
    // ===========================
    @PutMapping("/{cartId}")
    public ResponseEntity<Cart>
    updateQuantity(

            @PathVariable
            Long cartId,

            @RequestParam
            int quantity
    ) {

        return ResponseEntity.ok(

                cartService
                        .updateQuantity(
                                cartId,
                                quantity
                        )
        );
    }
}
