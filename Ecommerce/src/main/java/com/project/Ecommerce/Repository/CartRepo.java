package com.project.Ecommerce.Repository;

import com.project.Ecommerce.Model.Cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CartRepo
        extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(
            Long userId
    );

    @Transactional
    void deleteByProductId(
            Integer productId
    );
}
