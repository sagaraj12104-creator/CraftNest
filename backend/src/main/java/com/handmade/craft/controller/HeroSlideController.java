package com.handmade.craft.controller;

import com.handmade.craft.model.HeroSlide;
import com.handmade.craft.repository.HeroSlideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slides")
@CrossOrigin(origins = "*")
public class HeroSlideController {

    @Autowired
    private HeroSlideRepository heroSlideRepository;

    @GetMapping
    public List<HeroSlide> getActiveSlides() {
        return heroSlideRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    @GetMapping("/admin")
    public List<HeroSlide> getAllSlidesForAdmin() {
        return heroSlideRepository.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping
    public HeroSlide createSlide(@RequestBody HeroSlide slide) {
        if (slide.getActive() == null) slide.setActive(true);
        if (slide.getDisplayOrder() == null) slide.setDisplayOrder(1);
        return heroSlideRepository.save(slide);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeroSlide> updateSlide(@PathVariable Long id, @RequestBody HeroSlide updated) {
        return heroSlideRepository.findById(id).map(slide -> {
            slide.setTitle(updated.getTitle());
            slide.setSubtitle(updated.getSubtitle());
            slide.setImageUrl(updated.getImageUrl());
            slide.setButtonText(updated.getButtonText());
            slide.setCategoryTag(updated.getCategoryTag());
            slide.setActive(updated.getActive());
            slide.setDisplayOrder(updated.getDisplayOrder());
            return ResponseEntity.ok(heroSlideRepository.save(slide));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable Long id) {
        if (heroSlideRepository.existsById(id)) {
            heroSlideRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
