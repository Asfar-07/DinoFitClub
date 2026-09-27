package com.project.gym_management.dashboard.infrastructure;

import com.project.gym_management.dashboard.domain.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {


    @Query("""
    SELECT c
    FROM Community c
    JOIN FETCH c.level
    WHERE c.owner.id = :ownerId
    ORDER BY c.createdAt DESC
""")
    List<Community> findByOwnerIdWithLevel(@Param("ownerId") Long ownerId);

    long countByOwnerId(Long userId);

    Optional<Community> findByPublicId(String publicId);

    List<Community> findByCategory(Community.Category category);

    List<Community> findByLevelId(Long level);

    List<Community> findByNameContainingIgnoreCase(String name);

    @Query("""
        SELECT cf.community
        FROM CommunityFollower cf
        WHERE cf.user.id = :userId
        ORDER BY cf.followedAt DESC
    """)
    List<Community> findFollowedCommunities(
            @Param("userId") Long userId
    );
}
