import React from 'react';

import {
    Modal as ChakraModal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

interface Props {
    modalHeader: React.ReactNode,
    modalBody: React.ReactNode,
    modalFooter?: React.ReactNode,
    isOpen: boolean,
    onClose: () => void,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
    isCentered?: boolean
}

const Modal: React.FC<Props> = ({ isOpen, onClose, modalFooter, modalHeader, modalBody, size, isCentered = true}) => {
    return (
        <ChakraModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            isCentered={isCentered}
        >
            <ModalOverlay />
            <ModalContent
                bg='background.500'
            >
                <ModalHeader
                    color='white'
                    textAlign={'center'}
                    fontSize={'2xl'}
                >
                    {modalHeader}
                </ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    {modalFooter}
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
};

export default Modal;
