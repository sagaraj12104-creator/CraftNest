package com.handmade.craft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hero_slides")
public class HeroSlide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    
    private String buttonText;
    private String categoryTag;
    private Boolean active;
    private Integer displayOrder;

    public HeroSlide() {}

    public HeroSlide(String title, String subtitle, String imageUrl, String buttonText, String categoryTag, Boolean active, Integer displayOrder) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
        this.buttonText = buttonText;
        this.categoryTag = categoryTag;
        this.active = active;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getButtonText() { return buttonText; }
    public void setButtonText(String buttonText) { this.buttonText = buttonText; }

    public String getCategoryTag() { return categoryTag; }
    public void setCategoryTag(String categoryTag) { this.categoryTag = categoryTag; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
