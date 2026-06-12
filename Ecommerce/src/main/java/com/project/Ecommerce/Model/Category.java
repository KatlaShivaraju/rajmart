package com.project.Ecommerce.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Category {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Integer id;

    @NotBlank(
            message =
                    "Category name required"
    )
    private String name;

    @NotBlank(
            message =
                    "Description required"
    )
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(
            Integer id
    ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description =
                description;
    }
}
