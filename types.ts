
export enum VerificationStep {
  IDLE = 'IDLE',
  IG_FOLLOWING = 'IG_FOLLOWING',
  IG_DONE = 'IG_DONE',
  TIKTOK_FOLLOWING = 'TIKTOK_FOLLOWING',
  TIKTOK_DONE = 'TIKTOK_DONE',
  UNLOCKED = 'UNLOCKED'
}

export interface SocialConfig {
  igUrl: string;
  tiktokUrl: string;
  canvaUrl: string;
}
