package com.project.gym_management.dashboard.api.responsive;

public record CommunityLevelResponse(
        Long id,
        String name,
        Integer requiredPoints
) {
}
