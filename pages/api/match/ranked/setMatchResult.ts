import {NextApiRequest, NextApiResponse} from "next";

import {AptosAccount, HexString, Network} from "aptos";
import {TransactionPayload_EntryFunctionPayload} from "aptos/src/generated";

import {setMatchResult} from "@/services/transactionBuilder";
import {getAptosProvider} from "@/services/aptosProvider";

import {setMatchResult as setMatchResultDB} from "@/db/inserts/rankedInserts";

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
        const matchAddress = req.body.matchAddress as string;
        const winnerIndex = req.body.winnerIndex as number;
        const teams = req.body.teams as RankedMatchPlayer[][];

        if(matchAddress === undefined) {
            res.status(400).json({message: 'Match matchAddress is not a string'})
            return;
        }
        if(winnerIndex === undefined) {
            res.status(400).json({message: 'Winner index is not a valid index'})
            return;
        }
        if(teams === undefined) {
            res.status(400).json({message: 'Teams is undefined'})
            return;
        }
        if(!Array.isArray(teams)) {
            res.status(400).json({message: 'Teams is not an array'})
            return;
        }
        if(teams.length < 2) {
            res.status(400).json({message: 'Must have at least two teams'})
            return;
        }
        if(teams.some((team: RankedMatchPlayer[]) => team == undefined || team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        if(teams.some((team: RankedMatchPlayer[]) => team.some((player: RankedMatchPlayer) => (
            player.playerAddress === undefined || player.collectionIdHash == undefined || player.eliminations === undefined
        )))) {
            res.status(400).json({message: 'Teams is not formatted correctly'})
            return;
        }
        if(winnerIndex < 0 || winnerIndex >= teams.length) {
            res.status(400).json({message: 'Winner index is out of bounds'})
            return;
        }

        let { aptosClient } = getAptosProvider(Network.MAINNET);
        const PK_BYTES = new HexString(process.env.ADMIN_PK as string).toUint8Array()
        const account = new AptosAccount(PK_BYTES);
        let setMatchResultTransactionPayload = setMatchResult(matchAddress, winnerIndex) as TransactionPayload_EntryFunctionPayload;
        const txnRequest = await aptosClient.generateTransaction(
            aptosArenaModuleAddress,
            setMatchResultTransactionPayload
        );
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransactionWithResult(transactionRes.hash, { checkSuccess: true })
            .catch((e) => res.status(400).json({message: e.message}));

        await setMatchResultDB(matchAddress.substring(2), winnerIndex, teams)
            .catch((e) => res.status(400).json({message: e.message}));
        res.status(200).json({message: 'OK'})

    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}