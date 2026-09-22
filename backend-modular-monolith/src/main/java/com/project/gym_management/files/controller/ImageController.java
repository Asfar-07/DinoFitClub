package com.project.gym_management.files.controller;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class ImageController {


    public String SetAvatarImage(MultipartFile file, String uploadPath) throws IOException {
        if (file.isEmpty()) {
            return null;
        }

        // 1️⃣ create folder if not exist
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String avatarKey = UUID.randomUUID().toString();

        // 2️⃣ save file to folder
        String fileName = avatarKey + "-" + System.currentTimeMillis();
        Path filePath = Paths.get(uploadPath, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 3️⃣ image path to store in DB (relative path)
        String imagePath = "/" + uploadPath + fileName;

        // save `imagePath` in your database using repository (pseudo example)
        // userRepository.saveImagePath(userId, imagePath);

        return imagePath;
    }

}
