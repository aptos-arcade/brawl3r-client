import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload, UserTransaction} from "aptos/src/generated";

import {createMatch} from "@/services/transactionBuilder";
import {getAptosProvider} from "@/services/aptosProvider";

import { createMatch as createMatchDB } from "@/db/inserts/rankedInserts";

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
        const teams = req.body.teams as string[][]
        if(teams === undefined) {
            res.status(400).json({message: 'Teams is undefined'})
            return;
        }
        if(teams.length < 2) {
            res.status(400).json({message: 'Must have at least two teams'})
            return;
        }
        if(teams.some((team: string[]) => team == undefined || team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        if(teams.some((team: string[]) => team.some((player: string) => (
            player === undefined
        )))) {
            res.status(400).json({message: 'Teams is not formatted correctly'})
            return;
        }

        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.ADMIN_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let createMatchTransactionPayload = createMatch(teams) as TransactionPayload_EntryFunctionPayload;
        const txnRequest = await aptosClient.generateTransaction(
            aptosArenaModuleAddress,
            createMatchTransactionPayload
        );
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        const matchObjectId = await aptosClient.waitForTransactionWithResult(transactionRes.hash, { checkSuccess: true})
            .then((txRes) => (txRes as UserTransaction).events[0].data.token as string)
            .catch(() => "");
        if(matchObjectId === "") {
            res.status(400).json({message: 'Error creating match'});
            return;
        }

        await createMatchDB(matchObjectId.substring(2))
            .catch((e) => res.status(400).json({message: e.message}));
        res.status(200).json({message: matchObjectId});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}