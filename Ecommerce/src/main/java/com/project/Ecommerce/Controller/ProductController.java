package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }


    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }
//    @PostMapping("/products")
//    public Product addProduct(@RequestBody Product product) {
//        return service.addProduct(product);
//    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam BigDecimal price,
            @RequestParam String description,
            @RequestParam MultipartFile file
    ) {
        try {
            Product product = new Product();
            product.setImageName(name);
            product.setBrand(brand);
            product.setPrice(price);
            product.setDescription(description);

            Product saved = service.addProduct(product, file);

            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/products/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {

        Product product = service.getProductById(id);

        String type = product.getImageType();

        if (type == null || type.isEmpty()) {
            type = "image/jpeg"; // fallback
        }

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(type))
                .body(product.getImage());
    }
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id ,@RequestPart Product product,@RequestPart MultipartFile imagefile){
        Product product1= null;
        try {
            product1 = service.updateProduct(id ,product,imagefile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if(product1!=null){
            return new ResponseEntity<>("Successfully updated",HttpStatus.CREATED);

        }
        else{
            return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST);
        }
    }


}
