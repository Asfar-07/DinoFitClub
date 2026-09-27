import type { CommunityCategory, CommunityLevel, CommunityPrivacy } from "../CommunityDashboard/Community.type";

export interface AvatarData {
  id: string;
  src: string;
}

export interface CommunitySummary {
  publicId: string;
  name: string;
  logoUrl: string | null;
  description: string | null;
  category: CommunityCategory;
  privacy: CommunityPrivacy;
  points: number;
  level: CommunityLevel;
}

export interface AccountCommunitiesResponse {
  owned: CommunitySummary[];
  followed: CommunitySummary[];
}