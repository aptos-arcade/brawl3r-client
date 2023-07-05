import useAptosTransaction from "@/hooks/useAptosTransaction";

import {mintPlayerPayload} from "@/services/transactionBuilder";

const useCreateBrawler = () => {

    let { submitTransaction } = useAptosTransaction();

    const createPlayer = async () => {
        await submitTransaction(mintPlayerPayload, {
            title: "Brawler Created",
        });
    }

    return {
        createPlayer
    }
}

export default useCreateBrawler