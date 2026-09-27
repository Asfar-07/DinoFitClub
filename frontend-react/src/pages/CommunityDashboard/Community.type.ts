export type CommunityPrivacy = "PUBLIC" | "PRIVATE";


export type CommunityCategory = "Yoga" | "FITNESS" | "CROSSFIT" | "SPORTS" | "SWIMMING" |
  "WELLNESS" | "BOXING"

export interface CommunityLevel {
  id: number;
  name: CommunityLevels;
  requiredPoints: number;
}

export type CommunityLevels = "Dino Bronze" | "Dino Silver" | "Dino Gold" | "Dino Elite";

export interface CommunityOwnerResponse {
    publicId: string;
    name: string;
    logoUrl: string;
    description: string;
    phoneNumber: string;
    String: string;
    address: string;
    website: string;
    category: CommunityCategory;
    privacy: CommunityPrivacy;
    level: CommunityLevel;
    points: number;
    whenStarted: string;
}

export interface CommunityPublicResponse {
    publicId: string;
    name: string;
    logoUrl: string;
    description: string;
    category: CommunityCategory;
    level: CommunityLevel;
    points: number;
}

export type MainCommunityResponse =
    | {
          access: "OWNER";
          community: CommunityOwnerResponse;
      }
    | {
          access: "PUBLIC";
          community: CommunityPublicResponse;
      };
