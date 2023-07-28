import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload, UserTransaction} from "aptos/src/generated";

import {createMatch} from "@/services/transactionBuilder";
import {getAptosProvider} from "@/services/aptosProvider";

import { closeConnection, getConnection } from "@/db/connection";
import { createMatch as createMatchDB } from "@/db/inserts/rankedInserts";

import {aptosArenaModuleAddress} from "@/data/modules";

import {RankedMatchPlayer} from "@/types/Matches/RankedMatchPlayer";

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
        if(body.teams.some((team: RankedMatchPlayer[]) => team == undefined || team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        if(body.teams.some((team: RankedMatchPlayer[]) => team.some((player: RankedMatchPlayer) => (
            player.playerAddress === undefined || player.collectionIdHash == undefined
        )))) {
            res.status(400).json({message: 'Teams is not formatted correctly'})
            return;
        }

        const teams = body.teams as RankedMatchPlayer[][];

        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.ADMIN_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let createMatchTransactionPayload = createMatch(
            teams.map(team => team.map(player => player.playerAddress))
        ) as TransactionPayload_EntryFunctionPayload;
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

        const [pool, connection] = await getConnection();
        await pool.query(createMatchDB(matchObjectId.substring(2), teams))
            .catch((e) => res.status(400).json({message: e.message}));
        await closeConnection(pool, connection);
        res.status(200).json({message: matchObjectId});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}