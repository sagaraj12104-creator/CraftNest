package com.handmade.craft.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Value("${cloudinary.cloud-name:dpki2zylo}")
    private String cloudName;

    @Value("${cloudinary.api-key:}")
    private String apiKey;

    @Value("${cloudinary.api-secret:}")
    private String apiSecret;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "File is empty!");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            // Check if Cloudinary API keys are configured for Method 2 Signed Server Upload
            if (apiKey != null && !apiKey.trim().isEmpty() && apiSecret != null && !apiSecret.trim().isEmpty()) {
                Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                        "cloud_name", cloudName,
                        "api_key", apiKey,
                        "api_secret", apiSecret
                ));

                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String secureUrl = (String) uploadResult.get("secure_url");

                Map<String, String> response = new HashMap<>();
                response.put("url", secureUrl);
                return ResponseEntity.ok(response);
            } else {
                // If API Secret key is not set in application.properties yet, convert to Web Data URL
                String base64 = Base64.getEncoder().encodeToString(file.getBytes());
                String mimeType = file.getContentType() != null ? file.getContentType() : "image/jpeg";
                String dataUrl = "data:" + mimeType + ";base64," + base64;

                Map<String, String> response = new HashMap<>();
                response.put("url", dataUrl);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Upload failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
