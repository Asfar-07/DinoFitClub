package com.project.gym_management.dashboard.api.responsive;

import java.util.List;

public record AccountCommunitiesDTO(List<CommunitySummaryResponse> owned,
                                    List<CommunitySummaryResponse> followed) {

}
