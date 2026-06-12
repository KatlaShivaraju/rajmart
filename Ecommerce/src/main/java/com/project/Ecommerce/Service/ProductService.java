package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Repository.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import com.project.Ecommerce.Exception
        .ResourceNotFoundException;

@Service
public class ProductService {

 private final ProductRepo repo;

 public ProductService(ProductRepo repo) {
  this.repo = repo;
 }


 // ===========================
 // GET ALL PRODUCTS
 // ===========================
 public List<Product> getAllProducts() {
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
         MultipartFile imageFile
 ) throws IOException {

  product.setImageName(
          imageFile.getOriginalFilename()
  );

  product.setImageType(
          imageFile.getContentType()
  );

  product.setImageData(
          imageFile.getBytes()
  );

  return repo.save(product);
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

  if (existingProduct == null) {
   return null;
  }

  // Update fields
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

//  existingProduct.setCategory(
//          updatedProduct.getCategory()
//  );

  existingProduct.setReleaseDate(
          updatedProduct.getReleaseDate()
  );

  existingProduct.setAvailable(
          updatedProduct.isAvailable()
  );

  existingProduct.setQuantity(
          updatedProduct.getQuantity()
  );

  // Update image only if new image provided
  if (imageFile != null &&
          !imageFile.isEmpty()) {

   existingProduct.setImageName(
           imageFile
                   .getOriginalFilename()
   );

   existingProduct.setImageType(
           imageFile
                   .getContentType()
   );

   existingProduct.setImageData(
           imageFile.getBytes()
   );
  }

  return repo.save(existingProduct);
 }


 // ===========================
 // DELETE PRODUCT
 // ===========================
 public void deleteProduct(int id) {
  repo.deleteById(id);
 }


 // ===========================
 // SEARCH PRODUCTS
 // ===========================
 public List<Product> searchProducts(
         String keyword
 ) {
  return repo.searchProducts(keyword);
 }
}
