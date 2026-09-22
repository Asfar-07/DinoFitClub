export type CommunityPrivacy = "PUBLIC" | "PRIVATE";

export type CommunityCategory = "Yoga" | "FITNESS" | "CROSSFIT" | "SPORTS" | "SWIMMING" |
  "WELLNESS" | "BOXING"

export interface CommunityFormData {
  name: string;
  category: string;
  description: string;
  whenStarted: string;
  phoneNumber: string;
  website: string;
  address: string;
  privacy: CommunityPrivacy;
}