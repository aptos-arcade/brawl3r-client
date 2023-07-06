import {singletonHook} from "react-singleton-hook";

import {useDisclosure} from "@chakra-ui/react";

interface WalletModalHook {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const init: WalletModalHook = {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
}

const useWalletModal = (): WalletModalHook => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return {
        isOpen,
        onOpen,
        onClose,
    }
}

export default singletonHook(init, useWalletModal);