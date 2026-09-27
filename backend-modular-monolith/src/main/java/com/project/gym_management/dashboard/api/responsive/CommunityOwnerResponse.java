package com.project.gym_management.dashboard.api.responsive;

import com.project.gym_management.dashboard.domain.Community;

import java.time.LocalDate;

// Owner response
public record CommunityOwnerResponse(
        String publicId,
        String name,
        String logoUrl,
        String description,
        Community.Category category,
        LocalDate whenStarted,
        String phoneNumber,
        String website,
        String address,
        Community.Privacy privacy,
        CommunityLevelResponse level,
        Integer points
) {}