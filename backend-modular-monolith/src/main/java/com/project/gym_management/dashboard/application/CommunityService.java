package com.project.gym_management.dashboard.application;

import com.project.gym_management.dashboard.api.responsive.AccountCommunitiesDTO;
import com.project.gym_management.dashboard.api.responsive.CommunitySummaryResponse;
import com.project.gym_management.dashboard.domain.Community;
import org.springframework.data.crossstore.ChangeSetPersister;

import javax.naming.LimitExceededException;

public interface CommunityService {
    void createCommunity(Community newCommunity, Long userId) throws LimitExceededException;
    AccountCommunitiesDTO showCommunities(Long userId);
    Object getDashboardData(String publicId, Long userId);
}
