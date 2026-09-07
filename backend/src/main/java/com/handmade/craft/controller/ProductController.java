package com.handmade.craft.controller;

import com.handmade.craft.model.Product;
import com.handmade.craft.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String material,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sortBy
    ) {
        List<Product> products;

        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
        } else if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            products = productRepository.findByCategory(category);
        } else if (material != null && !material.trim().isEmpty() && !material.equalsIgnoreCase("All")) {
            products = productRepository.findByMaterial(material);
        } else {
            products = productRepository.findAll();
        }

        // Apply price filter
        if (minPrice != null) {
            products = products.stream().filter(p -> p.getPrice() >= minPrice).collect(Collectors.toList());
        }
        if (maxPrice != null) {
            products = products.stream().filter(p -> p.getPrice() <= maxPrice).collect(Collectors.toList());
        }

        // Apply sorting
        if ("price-asc".equalsIgnoreCase(sortBy)) {
            products.sort((a, b) -> Double.compare(a.getPrice(), b.getPrice()));
        } else if ("price-desc".equalsIgnoreCase(sortBy)) {
            products.sort((a, b) -> Double.compare(b.getPrice(), a.getPrice()));
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            products.sort((a, b) -> Double.compare(b.getRating(), a.getRating()));
        } else if ("newest".equalsIgnoreCase(sortBy)) {
            products.sort((a, b) -> Long.compare(b.getId(), a.getId()));
        }

        return products;
    }

    @GetMapping("/new-arrivals")
    public List<Product> getNewArrivals() {
        return productRepository.findByIsNewArrivalTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoints
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        if (product.getRating() == null) product.setRating(4.8);
        if (product.getIsNewArrival() == null) product.setIsNewArrival(true);
        if (product.getFeatured() == null) product.setFeatured(false);
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updated) {
        return productRepository.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setDescription(updated.getDescription());
            p.setPrice(updated.getPrice());
            p.setImageUrl(updated.getImageUrl());
            p.setCategory(updated.getCategory());
            p.setMaterial(updated.getMaterial());
            p.setStock(updated.getStock());
            p.setFeatured(updated.getFeatured());
            p.setIsNewArrival(updated.getIsNewArrival());
            p.setArtistName(updated.getArtistName());
            return ResponseEntity.ok(productRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
