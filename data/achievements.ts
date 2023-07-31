import {Achievement} from "@/types/Achievements";

export const eliminationsAchievement: Achievement = {
    name: "Eliminations",
    tiers: [
        {
            name: "Bronze",
            image: "/achievements/eliminations/bronze.png",
            threshold: 10,
            reward: "Iron Boots"
        },
        {
            name: "Silver",
            image: "/achievements/eliminations/silver.png",
            threshold: 15,
            reward: "Iron Helmet"
        },
        {
            name: "Gold",
            image: "/achievements/eliminations/gold.png",
            threshold: 30,
            reward: "Iron Chestplate"
        }
    ]
}

export const winsAchievement: Achievement = {
    name: "Wins",
    tiers: [
        {
            name: "Bronze",
            image: "/achievements/wins/bronze.png",
            threshold: 3,
            reward: "Gold Gun"
        },
        {
            name: "Silver",
            image: "/achievements/wins/silver.png",
            threshold: 5,
            reward: "Gold Sword"
        },
        {
            name: "Gold",
            image: "/achievements/wins/gold.png",
            threshold: 10,
            reward: "Stat Upgrade Buff"
        }
    ]
}

export const eloAchievement: Achievement = {
    name: "ELO",
    tiers: [
        {
            name: "Bronze",
            image: "/achievements/elo/bronze.png",
            threshold: 125,
            reward: "Diamond Sword"
        },
        {
            name: "Silver",
            image: "/achievements/elo/silver.png",
            threshold: 150,
            reward: "Diamond Gun"
        },
        {
            name: "Gold",
            image: "/achievements/elo/gold.png",
            threshold: 200,
            reward: "Stat Upgrade Buff"
        }
    ]
}

export const gamesAchievement: Achievement = {
    name: "Games",
    tiers: [
        {
            name: "Bronze",
            image: "/achievements/games/bronze.png",
            threshold: 5,
            reward: "Gold Boots"
        },
        {
            name: "Silver",
            image: "/achievements/games/silver.png",
            threshold: 10,
            reward: "Gold Chestplate"
        },
        {
            name: "Gold",
            image: "/achievements/games/gold.png",
            threshold: 20,
            reward: "Gold Helmet"
        }
    ]
}