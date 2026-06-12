package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Category;
import com.project.Ecommerce.Repository.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import com.project.Ecommerce.Exception
        .ResourceNotFoundException;

@Service
public class CategoryService {

    private final CategoryRepo repo;

    public CategoryService(
            CategoryRepo repo
    ) {
        this.repo = repo;
    }

    public Category addCategory(
            Category category
    ) {
        return repo.save(category);
    }

    public List<Category>
    getAllCategories() {
        return repo.findAll();
    }

    public Category
    getCategoryById(int id) {
        return repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with id "
                                        + id
                        )
                );
    }

    public Category updateCategory(
            int id,
            Category category
    ) {
        category.setId(id);
        return repo.save(category);
    }

    public void deleteCategory(
            int id
    ) {
        repo.deleteById(id);
    }
}
