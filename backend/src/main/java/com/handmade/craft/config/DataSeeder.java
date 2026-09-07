package com.handmade.craft.config;

import com.handmade.craft.model.HeroSlide;
import com.handmade.craft.model.Order;
import com.handmade.craft.model.OrderItem;
import com.handmade.craft.model.Product;
import com.handmade.craft.model.User;
import com.handmade.craft.repository.HeroSlideRepository;
import com.handmade.craft.repository.OrderRepository;
import com.handmade.craft.repository.ProductRepository;
import com.handmade.craft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HeroSlideRepository heroSlideRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedUsers();
        }
        if (heroSlideRepository.count() == 0) {
            seedHeroSlides();
        }
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (orderRepository.count() == 0) {
            seedOrders();
        }
    }

    private void seedUsers() {
        userRepository.save(new User(
                "Priya Sharma",
                "priya@example.com",
                "password123",
                "+91 98765 43210",
                "42 Heritage Park Road, Indiranagar, Bengaluru, KA 560038",
                "USER"
        ));

        userRepository.save(new User(
                "Store Administrator",
                "admin@handmadecraft.com",
                "admin123",
                "+91 99999 88888",
                "Craft Studio HQ, New Delhi",
                "ADMIN"
        ));
    }

    private void seedHeroSlides() {
        heroSlideRepository.save(new HeroSlide(
                "Handcrafted Terracotta Pottery",
                "Authentic clay craft moulded by master artisans with earthy warmth.",
                "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
                "Explore Pottery",
                "Ceramics",
                true,
                1
        ));

        heroSlideRepository.save(new HeroSlide(
                "Hand-Woven Tribal Textiles",
                "100% natural organic cotton scarves & woven tapestries crafted on handlooms.",
                "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80",
                "Shop Textiles",
                "Textiles",
                true,
                2
        ));

        heroSlideRepository.save(new HeroSlide(
                "Carved Teakwood Artifacts",
                "Hand-carved wooden tableware, sculptures, and heritage bowls.",
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
                "Discover Woodwork",
                "Woodwork",
                true,
                3
        ));
    }

    private void seedProducts() {
        productRepository.save(new Product(
                "Rustic Ceramic Clay Teapot Set",
                "Hand-thrown clay teapot with 4 matching cups, finished with natural wood-ash glaze.",
                48.50,
                "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
                "Ceramics",
                "Clay",
                15,
                true,
                true,
                4.9,
                "Master Artisan Kabir"
        ));

        productRepository.save(new Product(
                "Hand-Woven Indigo Shawl",
                "Soft organic cotton handloom shawl dyed with natural plant indigo extract.",
                62.00,
                "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80",
                "Textiles",
                "Cotton",
                20,
                true,
                true,
                4.8,
                "Weavers Guild of Kutch"
        ));

        productRepository.save(new Product(
                "Hand-Carved Walnut Wooden Bowl",
                "Carved from single block reclaimed dark walnut wood with organic oil finish.",
                35.00,
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
                "Woodwork",
                "Wood",
                12,
                true,
                true,
                4.9,
                "Forest Carvings Studio"
        ));

        productRepository.save(new Product(
                "Handcrafted Leather Bound Journal",
                "Full-grain vintage leather journal with 200 recycled deckle-edge cotton pages.",
                29.99,
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
                "Leather Craft",
                "Leather",
                25,
                false,
                true,
                4.7,
                "Craftsman Ankit"
        ));

        productRepository.save(new Product(
                "Hammered Antique Brass Candle Stand",
                "Hand-hammered solid brass candle holder inspired by royal heritage motifs.",
                42.00,
                "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80",
                "Home Decor",
                "Brass",
                18,
                true,
                false,
                4.8,
                "Moradabad Metal Artisans"
        ));

        productRepository.save(new Product(
                "Terracotta Decorative Wall Plate",
                "Hand-painted terracotta wall art with traditional folk art patterns.",
                38.00,
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
                "Ceramics",
                "Clay",
                10,
                false,
                true,
                4.6,
                "Earth & Color Studio"
        ));

        productRepository.save(new Product(
                "Boho Macrame Cotton Plant Hanger",
                "Intricately knotted natural unbleached cotton macrame plant holder.",
                24.50,
                "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
                "Textiles",
                "Cotton",
                30,
                false,
                false,
                4.9,
                "Knot & Thread Craft"
        ));

        productRepository.save(new Product(
                "Handcrafted Resin & Teak Wood Coasters",
                "Set of 4 artisan coasters combining crystal clear resin with live-edge wood.",
                32.00,
                "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
                "Woodwork",
                "Wood",
                22,
                true,
                false,
                4.9,
                "Wood & Resin Works"
        ));
    }

    private void seedOrders() {
        Order sampleOrder = new Order(
                "HMC-78A921F0",
                "Priya Sharma",
                "priya@example.com",
                "+91 98765 43210",
                "42 Heritage Park Road, Indiranagar, Bengaluru, KA 560038",
                83.50
        );
        sampleOrder.setStatus("SHIPPED");

        List<OrderItem> items = new ArrayList<>();
        items.add(new OrderItem(1L, "Rustic Ceramic Clay Teapot Set", "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80", 48.50, 1));
        items.add(new OrderItem(3L, "Hand-Carved Walnut Wooden Bowl", "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80", 35.00, 1));
        sampleOrder.setItems(items);

        orderRepository.save(sampleOrder);
    }
}
