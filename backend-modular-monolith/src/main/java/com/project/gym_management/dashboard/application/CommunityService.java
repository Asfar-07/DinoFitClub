package com.project.gym_management.dashboard.application;

import com.project.gym_management.dashboard.api.responsive.AccountCommunitiesDTO;
import com.project.gym_management.dashboard.domain.Community;

public interface CommunityService {
    void createCommunity(Community newCommunity, Long userId);
    AccountCommunitiesDTO showCommunities(Long userId);
}
