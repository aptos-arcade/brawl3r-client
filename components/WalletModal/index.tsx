import React, { useEffect } from 'react';

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import Modal from "@/components/Utilities/Modal";
import WalletOptions from "@/components/WalletModal/WalletOptions";

import useWalletModal from "@/hooks/useWalletModal";



const WalletModal = () => {

    const { connected } = useWallet();

    const { isOpen, onClose } = useWalletModal();

    useEffect(() => {
        if(connected) onClose();
    }, [connected, onClose]);

    return (
        <Modal
            modalHeader={"Connect Wallet"}
            modalBody={<WalletOptions />}
            isOpen={isOpen}
            onClose={onClose}
            size='xl'
        />
    );
};

export default WalletModal;
