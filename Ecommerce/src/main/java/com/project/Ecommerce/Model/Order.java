package com.project.Ecommerce.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;

    private BigDecimal totalAmount;

    private LocalDateTime orderDate;

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(
            User user
    ) {
        this.user = user;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
            BigDecimal totalAmount
    ) {
        this.totalAmount =
                totalAmount;
    }

    public LocalDateTime
    getOrderDate() {

        return orderDate;
    }

    public void setOrderDate(
            LocalDateTime orderDate
    ) {

        this.orderDate =
                orderDate;
    }
}
