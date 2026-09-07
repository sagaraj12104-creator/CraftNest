package com.handmade.craft.repository;

import com.handmade.craft.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsNewArrivalTrue();
    List<Product> findByFeaturedTrue();
    List<Product> findByCategory(String category);
    List<Product> findByMaterial(String material);
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nameQuery, String descQuery);
}
