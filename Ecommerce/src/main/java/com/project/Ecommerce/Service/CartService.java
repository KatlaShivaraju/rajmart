package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Cart;
import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Model.User;
import com.project.Ecommerce.Repository.CartRepo;
import com.project.Ecommerce.Repository.ProductRepo;
import com.project.Ecommerce.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ProductRepo productRepository;

    // ADD TO CART
    public Cart addToCart(
            Integer userId,
            Integer productId,
            int quantity
    ) {

        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }

    // GET CART
    public List<Cart> getCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // REMOVE ITEM
    public String removeItem(Long id) {

        cartRepository.deleteById(id);

        return "Item removed from cart";
    }
}
