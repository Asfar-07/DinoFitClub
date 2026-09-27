package com.project.gym_management.dashboard.api.responsive;

import com.project.gym_management.dashboard.domain.Community;

public record CommunityPublicResponse(
        String publicId,
        String name,
        String logoUrl,
        String description,
        Community.Category category,
        CommunityLevelResponse level,
        Integer points
) {}