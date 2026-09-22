package com.project.gym_management.dashboard.infrastructure;

import com.project.gym_management.dashboard.domain.CommunityLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityLevelRepository extends JpaRepository<CommunityLevel, Long> {

    Optional<CommunityLevel> findBySlug(String slug);

    Optional<CommunityLevel> findByLevel(Integer level);
}
