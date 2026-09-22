package com.project.gym_management.dashboard.infrastructure;

import com.project.gym_management.dashboard.domain.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {

    List<CommunityMember> findByCommunityId(Long communityId);

    List<CommunityMember> findByUserId(Long userId);

    Optional<CommunityMember> findByCommunityIdAndUserId(Long communityId, Long userId);

    List<CommunityMember> findByCommunityIdAndMembershipType(Long communityId, CommunityMember.MembershipType membershipType);

    boolean existsByCommunityIdAndUserId(Long communityId, Long userId);
}
