import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload} from "aptos/src/generated";

import {setMatchResult} from "@/services/transactionBuilder";
import {getAptosProvider} from "@/services/aptosProvider";

import {closeConnection, getConnection} from "@/db/connection";
import {setMatchResult as setMatchResultDB} from "@/db/inserts/rankedInserts";

import {aptosArenaModuleAddress} from "@/data/modules";

interface Data {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'OPTIONS') {
        return res.status(200).send({message: "OK"});
    }
    if (req.method === 'POST') {
        // get the request body json
        const { body } = req;

        if(body.matchAddress === undefined || typeof body.matchAddress !== 'string') {
            res.status(400).json({message: 'Match matchAddress is not a string'})
            return;
        }
        if(body.winnerIndex === undefined || typeof body.winnerIndex !== 'number') {
            res.status(400).json({message: 'Winner index is not a valid index'})
            return;
        }

        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.ADMIN_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let setMatchResultTransactionPayload = setMatchResult(body.matchAddress, body.winnerIndex) as TransactionPayload_EntryFunctionPayload;
        const txnRequest = await aptosClient.generateTransaction(
            aptosArenaModuleAddress,
            setMatchResultTransactionPayload
        );
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransactionWithResult(transactionRes.hash, { checkSuccess: true })
            .catch((e) => res.status(400).json({message: e.message}));

        const [pool, connection] = await getConnection();
        await pool.query(setMatchResultDB((body.matchAddress as string).substring(2), body.winnerIndex as number))
            .catch((e) => res.status(400).json({message: e.message}));
        await closeConnection(pool, connection);

        res.status(200).json({message: 'OK'})

    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}