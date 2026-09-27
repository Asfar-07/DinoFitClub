import type { CommunityPrivacy } from "../CommunityDashboard/Community.type";


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