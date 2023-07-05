import {AchievementTier} from "@/types/Achievements/AchievementTier";

export interface Achievement {
    name: string;
    tiers: AchievementTier[];
}