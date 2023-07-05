import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload} from "aptos/src/generated";

import {setMatchResult} from "@/services/transactionBuilder";
import {getAptosProvider} from "@/services/aptosProvider";

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
        if(body.matchAddress === undefined || typeof body.matchAddress !== 'string' || body.winnerIndex === undefined
            || typeof body.winnerIndex !== 'number') {
            res.status(400).json({message: 'Invalid request body'})
            return;
        }
        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.APTOS_ARENA_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let setMatchResultTransactionPayload = setMatchResult(body.matchAddress, body.winnerIndex) as TransactionPayload_EntryFunctionPayload;
        const txnRequest = await aptosClient.generateTransaction(
            aptosArenaModuleAddress,
            setMatchResultTransactionPayload
        );
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransactionWithResult(transactionRes.hash, { checkSuccess: true })
            .then((txRes) => res.status(200).json({message: txRes.hash}))
            .catch((e) => res.status(400).json({message: e.message}));

    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}