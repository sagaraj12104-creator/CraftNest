package com.handmade.craft.repository;

import com.handmade.craft.model.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, Long> {
    List<HeroSlide> findByActiveTrueOrderByDisplayOrderAsc();
    List<HeroSlide> findAllByOrderByDisplayOrderAsc();
}
