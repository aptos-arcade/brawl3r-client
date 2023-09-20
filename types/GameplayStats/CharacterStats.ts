import {StrikerData} from "@/types/GameplayStats/StrikerData";
import {Color} from "@/types/GameplayStats/Color";

export interface CharacterStats {
    // movement
    acceleration: number;
    deceleration: number;
    gravityScale: number;
    speed: number;
    fastFallForce: number;

    // jumping
    jumpForce: number;
    numAirJumps: number;
    airJumpDampening: number;

    // attacks
    sideMeleeAttack: StrikerData;
    jabMeleeAttack: StrikerData;
    upMeleeAttack: StrikerData;
    downMeleeAttack: StrikerData;

    // shield
    shieldDuration: number;
    shieldStunDuration: number;
    shieldEnergyRegenTime: number;
    shieldCooldown: number;

    // energy
    meleeEnergyRegenTime: number;
    meleeEnergyRegenAmount: number;

    // portal color
    portalColor: Color;
}