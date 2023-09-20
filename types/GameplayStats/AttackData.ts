import {Vector} from "@/types/GameplayStats/Vector";

export interface AttackData {
    knockback: number;
    damage: number;
    knockbackDirection: Vector;
    stunTime: number;
}