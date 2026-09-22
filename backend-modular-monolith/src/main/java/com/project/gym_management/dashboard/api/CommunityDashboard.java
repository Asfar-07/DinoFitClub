package com.project.gym_management.dashboard.api;

import com.project.gym_management.dashboard.application.CommunityService;
import com.project.gym_management.dashboard.domain.Community;
import com.project.gym_management.files.controller.ImageController;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/community/dashboard")
public class CommunityDashboard {
    @Autowired
    CommunityService communityService;

    ImageController imageController = new ImageController();

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> CreateDashboard(@RequestPart("data") Community data, HttpServletRequest request,
                                             @RequestPart(value = "logoFile", required = false) MultipartFile logoFile){

        String userId = (String) request.getAttribute("userId");
        String imgPath = null;
        try {
            if (logoFile != null) {
                imgPath = imageController.SetAvatarImage(logoFile, "uploads/logo/");
            }
            data.setLogoUrl(imgPath);

            communityService.createCommunity(data, Long.valueOf(userId));
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping(value = "/give/data/client")
    public  ResponseEntity<?> DashboardDataToClient(@RequestParam("dashId") String dashId){
//        ArrayList<Object> data=service.getDashboardData(12345,dashId);
       return ResponseEntity.ok("data");
    }

}
