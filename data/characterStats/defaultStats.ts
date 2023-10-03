import {CharacterStats} from "@/types/GameplayStats/CharacterStats";

const defaultStats: CharacterStats = {
    // movement
    acceleration: 80,
    deceleration: 40,
    gravityScale: 4,
    speed: 8,
    fastFallForce: 800,

    // jumping
    jumpForce: 1200,
    numAirJumps: 2,
    airJumpDampening: 0.9,

    // attacks
    sideMeleeAttack: {
        energy: 0.4,
        attackData: {
            knockback: 7.5,
            damage: 0.3,
            stunTime: 0.25,
            knockbackDirection: {x: 1, y: 3},
        }
    },
    jabMeleeAttack: {
        energy: 0.2,
        attackData: {
            knockback: 1,
            damage: 0.1,
            stunTime: 0.25,
            knockbackDirection: {x: 1, y: 0},
        }
    },
    upMeleeAttack: {
        energy: 0.2,
        attackData: {
            knockback: 7.5,
            damage: 0.2,
            stunTime: 0.125,
            knockbackDirection: {x: 1, y: 4},
        }
    },
    downMeleeAttack: {
        energy: 0.3,
        attackData: {
            knockback: 5,
            damage: 0.25,
            stunTime: 0.125,
            knockbackDirection: {x: 1, y: -1},
        }
    },

    // shield
    shieldDuration: 5,
    shieldStunDuration: 2,
    shieldEnergyRegenTime: 5,
    shieldCooldown: 2,

    // energy
    meleeEnergyRegenTime: 7.5,
    meleeEnergyRegenAmount: 5,

    // portal color
    portalColor: {r: 132, g: 217, b: 133, a: 255},
}

export default defaultStats;