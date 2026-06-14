package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Model.Category;

import com.project.Ecommerce.Repository.ProductRepo;
import com.project.Ecommerce.Repository.CategoryRepo;
import com.project.Ecommerce.Repository.CartRepo;

import com.project.Ecommerce.Exception
        .ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

 private final ProductRepo repo;
 private final CategoryRepo categoryRepo;
 private final CartRepo cartRepo;

 public ProductService(

         ProductRepo repo,

         CategoryRepo categoryRepo,

         CartRepo cartRepo
 ) {

  this.repo =
          repo;

  this.categoryRepo =
          categoryRepo;

  this.cartRepo =
          cartRepo;
 }

 // ===========================
 // GET ALL PRODUCTS
 // ===========================
 public List<Product>
 getAllProducts() {

  return repo.findAll();
 }

 // ===========================
 // GET PRODUCT BY ID
 // ===========================
 public Product getProductById(
         int id
 ) {

  return repo.findById(id)
          .orElseThrow(() ->

                  new ResourceNotFoundException(
                          "Product not found with id "
                                  + id
                  )
          );
 }

 // ===========================
 // ADD PRODUCT
 // ===========================
 public Product addProduct(

         Product product,

         MultipartFile imageFile,

         String category

 ) throws IOException {

  Category categoryObj =

          categoryRepo
                  .findByName(
                          category
                  )
                  .orElseThrow(() ->

                          new RuntimeException(
                                  "Category not found"
                          )
                  );

  product.setCategory(
          categoryObj
  );

  product.setImageName(

          imageFile
                  .getOriginalFilename()
  );

  product.setImageType(

          imageFile
                  .getContentType()
  );

  product.setImageData(

          imageFile
                  .getBytes()
  );

  return repo.save(
          product
  );
 }

 // ===========================
 // UPDATE PRODUCT
 // ===========================
 public Product updateProduct(

         int id,

         Product updatedProduct,

         MultipartFile imageFile

 ) throws IOException {

  Product existingProduct =

          repo.findById(id)
                  .orElse(null);

  if (
          existingProduct
                  == null
  ) {

   return null;
  }

  existingProduct.setName(
          updatedProduct.getName()
  );

  existingProduct.setDescription(
          updatedProduct.getDescription()
  );

  existingProduct.setBrand(
          updatedProduct.getBrand()
  );

  existingProduct.setPrice(
          updatedProduct.getPrice()
  );

  existingProduct.setReleaseDate(
          updatedProduct.getReleaseDate()
  );

  existingProduct.setAvailable(
          updatedProduct.isAvailable()
  );

  existingProduct.setQuantity(
          updatedProduct.getQuantity()
  );

  // update image
  if (
          imageFile != null &&
                  !imageFile.isEmpty()
  ) {

   existingProduct.setImageName(

           imageFile
                   .getOriginalFilename()
   );

   existingProduct.setImageType(

           imageFile
                   .getContentType()
   );

   existingProduct.setImageData(

           imageFile
                   .getBytes()
   );
  }

  return repo.save(
          existingProduct
  );
 }


 // ===========================
// DELETE PRODUCT
// ===========================
 public void deleteProduct(
         int id
 ) {

  Product product =

          repo.findById(id)
                  .orElseThrow(() ->

                          new RuntimeException(
                                  "Product not found"
                          )
                  );

  try {

   // remove from carts
   cartRepo
           .deleteByProductId(
                   id
           );

  } catch (Exception e) {

   System.out.println(
           "Cart delete error: "
                   + e.getMessage()
   );
  }

  repo.deleteById(
          id
  );
 }

 // ===========================
 // SEARCH PRODUCTS
 // ===========================
 public List<Product>
 searchProducts(
         String keyword
 ) {

  return repo.searchProducts(
          keyword
  );
 }

 // ===========================
 // CATEGORY FILTER
 // ===========================
 public List<Product>
 getProductsByCategory(
         String category
 ) {

  return repo
          .findByCategory_Name(
                  category
          );
 }
}
