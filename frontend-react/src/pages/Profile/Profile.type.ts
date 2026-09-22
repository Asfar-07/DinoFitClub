import type { CommunityPrivacy, CommunityCategory } from "../CreateCommunity/Community.type";

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

export interface CommunityLevel {
  id: number;
  name: string;
  requiredPoints: number;
}

export interface AccountCommunitiesResponse {
  owned: CommunitySummary[];
  followed: CommunitySummary[];
}