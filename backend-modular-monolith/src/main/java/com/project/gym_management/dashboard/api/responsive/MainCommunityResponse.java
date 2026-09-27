package com.project.gym_management.dashboard.api.responsive;

public record MainCommunityResponse(Access access,
                                    Object community) {
    public enum Access {
        OWNER,
        PUBLIC
    }
}
