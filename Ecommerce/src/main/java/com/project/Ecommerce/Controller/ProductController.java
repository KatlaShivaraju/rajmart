package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Service.ProductService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ProductController {

    private final ProductService service;

    public ProductController(
            ProductService service
    ) {
        this.service = service;
    }

    // ===========================
    // GET ALL PRODUCTS
    // ===========================
    @GetMapping("/products")
    public ResponseEntity<List<Product>>
    getAllProducts() {

        List<Product> products =
                service.getAllProducts();

        return ResponseEntity.ok(
                products
        );
    }

    // ===========================
    // GET PRODUCT BY ID
    // ===========================
    @GetMapping("/products/{id}")
    public ResponseEntity<?>
    getProductById(
            @PathVariable
            int id
    ) {

        Product product =
                service.getProductById(
                        id
                );

        if (product == null) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND
                    )
                    .body(
                            "Product not found"
                    );
        }

        return ResponseEntity.ok(
                product
        );
    }

    // ===========================
    // ADD PRODUCT
    // ===========================
    @PostMapping("/products")
    public ResponseEntity<?>
    addProduct(

            @RequestParam
            String name,

            @RequestParam
            String brand,

            @RequestParam
            BigDecimal price,

            @RequestParam
            String description,

            @RequestParam
            String category,

            @RequestParam
            boolean available,

            @RequestParam
            int quantity,

            @RequestParam
            LocalDate releaseDate,

            @RequestParam
            MultipartFile file
    ) {

        try {

            Product product =
                    new Product();

            product.setName(
                    name
            );

            product.setBrand(
                    brand
            );

            product.setPrice(
                    price
            );

            product.setDescription(
                    description
            );

            product.setAvailable(
                    available
            );

            product.setQuantity(
                    quantity
            );

            product.setReleaseDate(
                    releaseDate
            );

            Product saved =
                    service.addProduct(
                            product,
                            file,
                            category
                    );

            return new ResponseEntity<>(
                    saved,
                    HttpStatus.CREATED
            );

        } catch (Exception e) {

            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // ===========================
    // GET PRODUCT IMAGE
    // ===========================
    @GetMapping(
            "/products/{productId}/image"
    )
    public ResponseEntity<byte[]>
    getImageByProductId(
            @PathVariable
            int productId
    ) {

        Product product =
                service.getProductById(
                        productId
                );

        return ResponseEntity.ok()
                .contentType(
                        MediaType.valueOf(
                                product
                                        .getImageType()
                        )
                )
                .body(
                        product
                                .getImageData()
                );
    }

    // ===========================
    // UPDATE PRODUCT
    // ===========================
    @PutMapping(
            value =
                    "/products/{id}",
            consumes =
                    MediaType
                            .MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String>
    updateProduct(

            @PathVariable
            int id,

            @RequestPart(
                    "product"
            )
            String productJson,

            @RequestPart(
                    value =
                            "imagefile",
                    required =
                            false
            )
            MultipartFile imagefile
    ) {

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            mapper.registerModule(
                    new JavaTimeModule()
            );

            Product product =
                    mapper.readValue(
                            productJson,
                            Product.class
                    );

            Product updatedProduct =
                    service.updateProduct(
                            id,
                            product,
                            imagefile
                    );

            if (
                    updatedProduct
                            == null
            ) {

                return ResponseEntity
                        .status(
                                HttpStatus
                                        .NOT_FOUND
                        )
                        .body(
                                "Product not found"
                        );
            }

            return ResponseEntity.ok(
                    "Product updated successfully"
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus
                                    .INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Error: "
                                    + e.getMessage()
                    );
        }
    }

    // ===========================
    // DELETE PRODUCT
    // ===========================
    @DeleteMapping(
            "/products/{id}"
    )
    public ResponseEntity<String>
    deleteProduct(
            @PathVariable
            int id
    ) {

        Product product =
                service.getProductById(
                        id
                );

        if (product == null) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND
                    )
                    .body(
                            "Product not found"
                    );
        }

        service.deleteProduct(
                id
        );

        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }

    // ===========================
    // SEARCH PRODUCTS
    // ===========================
    @GetMapping(
            "/products/search"
    )
    public ResponseEntity<List<Product>>
    searchProducts(
            @RequestParam
            String keyword
    ) {

        List<Product> products =
                service.searchProducts(
                        keyword
                );

        return ResponseEntity.ok(
                products
        );
    }

    // ===========================
    // FILTER CATEGORY
    // ===========================
    @GetMapping(
            "/products/category"
    )
    public ResponseEntity<List<Product>>
    getProductsByCategory(
            @RequestParam
            String category
    ) {

        return ResponseEntity.ok(
                service
                        .getProductsByCategory(
                                category
                        )
        );
    }
}
