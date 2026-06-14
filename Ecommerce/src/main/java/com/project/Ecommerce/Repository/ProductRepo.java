package com.project.Ecommerce.Repository;

import com.project.Ecommerce.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo
        extends JpaRepository<Product, Integer> {

    @Query("""
        SELECT p
        FROM Product p
        WHERE LOWER(p.name)
        LIKE LOWER(CONCAT('%', ?1, '%'))
        OR LOWER(p.description)
        LIKE LOWER(CONCAT('%', ?1, '%'))
        OR LOWER(p.brand)
        LIKE LOWER(CONCAT('%', ?1, '%'))
    """)
    List<Product>
    searchProducts(
            String keyword
    );

    List<Product>
    findByCategory_Name(
            String category
    );
}
