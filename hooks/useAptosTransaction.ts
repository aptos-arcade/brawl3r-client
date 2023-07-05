import { useToast } from "@chakra-ui/react";

import { useWallet as useWalletAdapter } from "@aptos-labs/wallet-adapter-react";

import { TransactionPayload_EntryFunctionPayload, Transaction_UserTransaction } from "aptos/src/generated";

import { useAptos } from "@/contexts/AptosContext";

interface ToastMessage {
    title: string;
}

const useAptosTransaction = () => {

    const { provider, updateClient } = useAptos();

    const { signAndSubmitTransaction } = useWalletAdapter();

    const toast = useToast();

    const submitTransaction = async (
        transaction: TransactionPayload_EntryFunctionPayload,
        toastMessage: ToastMessage
    ): Promise<boolean> => {
        return signAndSubmitTransaction(transaction)
            .then(async ({hash}) => {
                return provider.aptosClient.waitForTransactionWithResult(hash)
                    // @ts-ignore
                    .then(async (transaction: Transaction_UserTransaction) => {
                        if(transaction.success) {
                            await updateClient();
                            toast({
                                title: toastMessage.title,
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                            return true;
                        } else {
                            toast({
                                title: "Transaction failed!",
                                description: transaction.vm_status,
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            return false;
                        }
                    })
            })
            .catch((e) => {
                toast({
                    title: "Transaction Failed",
                    description: e.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return false;
            })
    }

    return {
        submitTransaction
    }
}

export default useAptosTransaction;