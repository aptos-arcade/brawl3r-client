import type {NextApiRequest, NextApiResponse} from 'next'

import defaultStats from "@/data/characterStats/defaultStats";

import {CharacterStats} from "@/types/GameplayStats/CharacterStats";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CharacterStats>
) {
    res.status(200).json(defaultStats);
}


