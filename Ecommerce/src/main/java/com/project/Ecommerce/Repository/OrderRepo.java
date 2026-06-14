package com.project.Ecommerce.Repository;

import com.project.Ecommerce.Model.Order;

import org.springframework.data.jpa.repository
        .JpaRepository;

import java.util.List;

public interface OrderRepo
        extends JpaRepository
        <Order, Long> {

    List<Order>
    findByUserId(
            Long userId
    );
}
