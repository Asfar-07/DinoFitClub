package com.project.gym_management.dashboard.api.responsive;

import com.project.gym_management.dashboard.domain.Community;

public record CommunitySummaryResponse(
        String publicId,
        String name,
        String logoUrl,
        String description,
        Community.Category category,
        Community.Privacy privacy,
        Integer points,
        CommunityLevelResponse level
) {
}
