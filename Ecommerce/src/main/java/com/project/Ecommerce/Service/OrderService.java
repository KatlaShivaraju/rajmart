package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Cart;
import com.project.Ecommerce.Model.Order;
import com.project.Ecommerce.Model.OrderItem;
import com.project.Ecommerce.Model.User;

import com.project.Ecommerce.Repository.CartRepo;
import com.project.Ecommerce.Repository.OrderItemRepo;
import com.project.Ecommerce.Repository.OrderRepo;
import com.project.Ecommerce.Repository.UserRepo;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final CartRepo cartRepo;
    private final UserRepo userRepo;

    public OrderService(

            OrderRepo orderRepo,

            OrderItemRepo orderItemRepo,

            CartRepo cartRepo,

            UserRepo userRepo
    ) {

        this.orderRepo =
                orderRepo;

        this.orderItemRepo =
                orderItemRepo;

        this.cartRepo =
                cartRepo;

        this.userRepo =
                userRepo;
    }

    // ===========================
    // PLACE ORDER
    // ===========================
    public String placeOrder(
            Long userId
    ) {

        User user =
                userRepo.findById(
                                userId
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User not found"
                                )
                        );

        List<Cart> cartItems =
                cartRepo.findByUserId(
                        userId
                );

        if (
                cartItems.isEmpty()
        ) {

            throw new RuntimeException(
                    "Cart is empty"
            );
        }

        BigDecimal totalAmount =
                BigDecimal.ZERO;

        for (
                Cart item :
                cartItems
        ) {

            BigDecimal itemTotal =

                    item.getProduct()
                            .getPrice()
                            .multiply(

                                    BigDecimal
                                            .valueOf(
                                                    item.getQuantity()
                                            )
                            );

            totalAmount =
                    totalAmount.add(
                            itemTotal
                    );
        }

        // Create Order
        Order order =
                new Order();

        order.setUser(
                user
        );

        order.setTotalAmount(
                totalAmount
        );

        order.setOrderDate(
                LocalDateTime.now()
        );

        Order savedOrder =
                orderRepo.save(
                        order
                );

        // Save Order Items
        for (
                Cart item :
                cartItems
        ) {

            OrderItem orderItem =
                    new OrderItem();

            orderItem.setOrder(
                    savedOrder
            );

            orderItem.setProduct(
                    item.getProduct()
            );

            orderItem.setQuantity(
                    item.getQuantity()
            );

            orderItem.setPrice(

                    item.getProduct()
                            .getPrice()
            );

            orderItemRepo.save(
                    orderItem
            );
        }

        // Clear Cart
        cartRepo.deleteAll(
                cartItems
        );

        return
                "Order placed successfully";
    }

    // ===========================
    // GET ORDERS
    // ===========================
    public List<Order>
    getOrders(
            Long userId
    ) {

        return orderRepo
                .findByUserId(
                        userId
                );
    }
}
