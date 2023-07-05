import {useEffect, useCallback} from "react";

import {useWallet} from "@aptos-labs/wallet-adapter-react";


import useAptosTransaction from "@/hooks/useAptosTransaction";
import {useUnityContext} from "react-unity-webgl";
import {ReactUnityEventParameter} from "react-unity-webgl/distribution/types/react-unity-event-parameters";


const useGame = () => {

    const { account } = useWallet();

    const { submitTransaction } = useAptosTransaction();

    const {
        unityProvider,
        isLoaded,
        requestFullscreen,
        sendMessage,
        addEventListener,
        removeEventListener
    } = useUnityContext({
        loaderUrl: `/build/Web.loader.js`,
        dataUrl: `/build/Web.data`,
        frameworkUrl: `/build/Web.framework.js`,
        codeUrl: `/build/Web.wasm`
    });

    useEffect(() => {
        if(isLoaded) {
            sendMessage("WalletManager", "SetAccountAddress", account?.address?.toString() || "");
        }
    }, [account?.address, isLoaded, sendMessage]);

    const handleTransactionRequest = useCallback(async (func: string, args: string, typeArgs: string) => {
        const success = await submitTransaction({
            type: "entry_function_payload",
            function: func,
            arguments: args ? args.split(",") : [],
            type_arguments: typeArgs ? typeArgs.split(",") : []
        }, {
            title: "Transaction Submitted!",
        })
        sendMessage("TransactionHandler", "SendTransactionResult", success ? 1 : 0);
    }, [sendMessage, submitTransaction]);



    useEffect(() => {

        const onTransactionRequest = (
            func: ReactUnityEventParameter,
            args: ReactUnityEventParameter,
            typeArgs: ReactUnityEventParameter
        ) => {
            handleTransactionRequest(func as string, args as string, typeArgs as string);
            return undefined;
        }

        const onSetConnectModalOpen = (isOpen: ReactUnityEventParameter) => {
            console.log("onSetConnectModalOpen", (isOpen as number) > 0);
            return undefined;
        }

        addEventListener("OnTransactionRequest", onTransactionRequest);
        addEventListener("SetConnectModalOpen", onSetConnectModalOpen);
        return () => {
            removeEventListener("OnTransactionRequest", onTransactionRequest);
            removeEventListener("SetConnectModalOpen", onSetConnectModalOpen);
        };
    }, [addEventListener, removeEventListener, handleTransactionRequest]);

    return {
        unityProvider,
        isLoaded,
        requestFullscreen,
    }
}

export default useGame