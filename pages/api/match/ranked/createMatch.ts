import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload, UserTransaction} from "aptos/src/generated";

import {createMatch} from "@/services/transactionBuilder";
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
        if(body.teams === undefined) {
            res.status(400).json({message: 'Teams is undefined'})
            return;
        }
        if(body.teams.length < 2) {
            res.status(400).json({message: 'Must have at least two teams'})
            return;
        }
        if(body.teams.some((team: string[]) => team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.ADMIN_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let createMatchTransactionPayload = createMatch(body.teams as string[][]) as TransactionPayload_EntryFunctionPayload;
        const txnRequest = await aptosClient.generateTransaction(
            aptosArenaModuleAddress,
            createMatchTransactionPayload
        );
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransactionWithResult(transactionRes.hash, { checkSuccess: true})
            .then((txRes) =>
                res.status(200).json({message: (txRes as UserTransaction).events[0].data.token}))
            .catch((e) => res.status(400).json({message: e.message}));
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}