package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Category;
import com.project.Ecommerce.Service.CategoryService;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    private final
    CategoryService service;

    public CategoryController(
            CategoryService service
    ) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Category>
    addCategory(
            @Valid
            @RequestBody
            Category category
    ) {

        return new ResponseEntity<>(
                service.addCategory(
                        category
                ),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public List<Category>
    getAllCategories() {

        return service
                .getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category>
    getCategoryById(
            @PathVariable int id
    ) {

        Category category =
                service.getCategoryById(id);

        return category != null
                ? ResponseEntity.ok(
                category
        )
                : ResponseEntity
                .notFound()
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category>
    updateCategory(
            @PathVariable int id,
            @RequestBody
            Category category
    ) {

        return ResponseEntity.ok(
                service.updateCategory(
                        id,
                        category
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteCategory(
            @PathVariable int id
    ) {

        service.deleteCategory(
                id
        );

        return ResponseEntity.ok(
                "Deleted Successfully"
        );
    }
}
