import Cors from 'cors'

import {NextApiRequest, NextApiResponse} from "next";

export const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
});

export const runCorsMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        cors(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}