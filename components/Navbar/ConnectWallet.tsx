import React, { useEffect } from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useBreakpointValue,
    IconButton,
    useClipboard,
    useToast,
} from '@chakra-ui/react'

import { FaWallet } from 'react-icons/fa'

import { useWallet } from '@aptos-labs/wallet-adapter-react'

import Button from "@/components/Utilities/Button";

import useWalletModal from "@/hooks/useWalletModal";

import {ellipsize} from "@/services/utils";

const ConnectWallet: React.FC = () => {

    const { connected, account, disconnect } = useWallet();

    const { onCopy, setValue } = useClipboard("")

    const toast = useToast();

    const { onOpen } = useWalletModal();

    useEffect(() => {
        if (account?.address) {
            setValue(account?.address?.toString())
        }
    }, [account, setValue])

    const copy = () => {
        onCopy();
        toast({
            title: "Address Copied",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    const mobileView = useBreakpointValue({ base: true, sm: false });

    if(!account?.address?.toString()) {
        return (
            <Button
                buttonType='primary'
                onClick={onOpen}
            >
                Connect Wallet
            </Button>
        )
    }

    return (
        <Menu
            size={'sm'}
        >
            <MenuButton
                transition="all 0.3s"
                color='white'
                size='md'
                {
                    ...(mobileView ? {
                        as: IconButton,
                        icon: <FaWallet />,
                    } : {
                        as: IconButton,
                        leftIcon: <FaWallet />,
                    })
                }
                variant={'solid'}
                px={{ base: 2, md: 4 }}
            >
                {
                    account && (account.ansName ? `${account.ansName}.apt` : ellipsize(account.address.toString()))
                }
            </MenuButton>
            <MenuList
                bg='background.500'
            >
                <MenuItem
                    onClick={copy}
                    bg='transparent'
                    color='white'
                    _hover={{
                        bg: 'whiteAlpha.100',
                    }}
                >
                    Copy Address
                </MenuItem>
                <MenuItem
                    onClick={() => disconnect()}
                    bg='transparent'
                    color='white'
                    _hover={{
                        bg: 'whiteAlpha.100',
                    }}
                >
                    Disconnect
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ConnectWallet
