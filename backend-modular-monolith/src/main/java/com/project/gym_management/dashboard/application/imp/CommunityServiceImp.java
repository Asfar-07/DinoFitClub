package com.project.gym_management.dashboard.application.imp;

import com.project.gym_management.common.util.RandomIdGenerator;
import com.project.gym_management.dashboard.api.responsive.*;
import com.project.gym_management.dashboard.application.CommunityService;
import com.project.gym_management.dashboard.domain.Community;
import com.project.gym_management.dashboard.domain.CommunityLevel;
import com.project.gym_management.dashboard.infrastructure.CommunityLevelRepository;
import com.project.gym_management.dashboard.infrastructure.CommunityRepository;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.infrastructure.UserRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.naming.LimitExceededException;
import java.util.List;

@Service
public class CommunityServiceImp implements CommunityService {
    final UserRepository userRepository;
    final CommunityRepository communityRepository;
    final CommunityLevelRepository communityLevelRepository;

    public CommunityServiceImp(UserRepository userRepository, CommunityRepository communityRepository, CommunityLevelRepository communityLevelRepository) {
        this.userRepository = userRepository;
        this.communityRepository = communityRepository;
        this.communityLevelRepository = communityLevelRepository;
    }

    @Override
    public void createCommunity(Community newCommunity, Long userId) throws LimitExceededException {
        UserTable user = userRepository.findById(userId).orElseThrow(
                () -> new NullPointerException("user not found")
        );
        long countCommunity = communityRepository.countByOwnerId(user.getId());

        //one user only have to create 2 community
        if (countCommunity >= 2) {
            throw new LimitExceededException("Limit Ended");
        }

        CommunityLevel level = communityLevelRepository.findByLevel(1).orElseThrow(
                () -> new NullPointerException("not found level")
        );
        newCommunity.setOwner(user);
        newCommunity.setLevel(level);
        newCommunity.setPoints(30);
        newCommunity.setPublicId(RandomIdGenerator.generateId());

        communityRepository.save(newCommunity);
    }

    @Override
    public AccountCommunitiesDTO showCommunities(Long userId) {
        UserTable user = userRepository.findById(userId).orElseThrow(
                () -> new NullPointerException("user not found")
        );
        List<CommunitySummaryResponse> owned =
                communityRepository
                        .findByOwnerIdWithLevel(user.getId())
                        .stream()
                        .map(this::toSummary)
                        .toList();

        List<CommunitySummaryResponse> followed =
                communityRepository
                        .findFollowedCommunities(user.getId())
                        .stream()
                        .map(this::toSummary)
                        .toList();

        return new AccountCommunitiesDTO(
                owned,
                followed
        );
    }

    @Override
    public Object getDashboardData(String publicId, Long userId) {
        Community community = communityRepository.findByPublicId(publicId).orElseThrow(() ->
                new NullPointerException("community not found")
        );
        // check ower of community
        if (community.getOwner().getId() == userId) {
            return new MainCommunityResponse(
                    MainCommunityResponse.Access.OWNER,
                    toOwnerResponse(community)
            );
        } else  {
            // check privacy for normal user
            if (community.getPrivacy() == Community.Privacy.PUBLIC){
                return new MainCommunityResponse(
                        MainCommunityResponse.Access.PUBLIC,
                        toPublicResponse(community)
                );
            } else {
                throw new NullPointerException("community not found");
            }
        }
    }

    private CommunitySummaryResponse toSummary(Community community) {
        CommunityLevel level = community.getLevel();
        return new CommunitySummaryResponse(
                community.getPublicId(),
                community.getName(),
                community.getLogoUrl(),
                community.getDescription(),
                community.getCategory(),
                community.getPrivacy(),
                community.getPoints(),
                new CommunityLevelResponse(
                        level.getId(),
                        level.getName(),
                        level.getRequiredPoints()
                )
        );
    }

    private CommunityOwnerResponse toOwnerResponse(Community community) {
        CommunityLevel level = community.getLevel();
        return new CommunityOwnerResponse(
                community.getPublicId(),
                community.getName(),
                community.getLogoUrl(),
                community.getDescription(),
                community.getCategory(),
                community.getWhenStarted(),
                community.getPhoneNumber(),
                community.getWebsite(),
                community.getAddress(),
                community.getPrivacy(),
                new CommunityLevelResponse(
                        level.getId(),
                        level.getName(),
                        level.getRequiredPoints()
                ),
                community.getPoints()
        );
    }

    private CommunityPublicResponse toPublicResponse(Community community) {
        CommunityLevel level = community.getLevel();
        return new CommunityPublicResponse(
                community.getPublicId(),
                community.getName(),
                community.getLogoUrl(),
                community.getDescription(),
                community.getCategory(),
                new CommunityLevelResponse(
                        level.getId(),
                        level.getName(),
                        level.getRequiredPoints()
                ),
                community.getPoints()
        );
    }
}

