import React, { useEffect } from 'react';

import {Text, TextProps, useClipboard, useToast} from "@chakra-ui/react";

import useANS from "@/hooks/useANS";

import {ellipsize} from "@/services/utils";

interface Props {
    address: string;
    textProps?: TextProps
}

const AddressText: React.FC<Props> = ({ address, textProps }) => {

    const { name } = useANS(address);

    const { onCopy, setValue } = useClipboard(address)

    const toast = useToast();

    useEffect(() => {
        if (address) {
            setValue(address)
        }
    }, [address, setValue]);

    const copy = () => {
        onCopy();
        toast({
            title: "Address Copied",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <Text
            {...textProps}
            transition={'all 0.3s'}
            onClick={copy}
            cursor={'pointer'}
            rounded={'md'}
            p={2}
            _hover={{
                bg: 'whiteAlpha.50'
            }}
        >
            {
                name ? (
                    name
                ) : (
                    ellipsize(address, 6, 4)
                )
            }
        </Text>
    );
};

export default AddressText;
