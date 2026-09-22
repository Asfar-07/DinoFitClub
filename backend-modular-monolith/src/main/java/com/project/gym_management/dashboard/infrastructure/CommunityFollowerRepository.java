package com.project.gym_management.dashboard.infrastructure;

import com.project.gym_management.dashboard.domain.CommunityFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityFollowerRepository extends JpaRepository<CommunityFollower, Long> {

    List<CommunityFollower> findByCommunityId(Long communityId);

    List<CommunityFollower> findByUserId(Long userId);

    Optional<CommunityFollower> findByCommunityIdAndUserId(Long communityId, Long userId);

    boolean existsByCommunityIdAndUserId(Long communityId, Long userId);

    void deleteByCommunityIdAndUserId(Long communityId, Long userId);
}
