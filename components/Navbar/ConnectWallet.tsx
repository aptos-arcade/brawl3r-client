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
    Image,
    Flex,
} from '@chakra-ui/react'

import { FaWallet } from 'react-icons/fa'

import { useWallet, Wallet } from '@aptos-labs/wallet-adapter-react'

import {ellipsize} from "@/services/utils";

const ConnectWallet: React.FC = () => {

    const { connected, account, disconnect, wallets, connect } = useWallet();

    const { onCopy, setValue } = useClipboard("")

    const toast = useToast();

    useEffect(() => {
        if (account?.address) {
            setValue(account?.address?.toString())
        }
    }, [account, setValue])


    const onConnect = async (wallet : Wallet) => {
        connect(wallet.name);
    }

    const copy = () => {
        onCopy();
        toast({
            title: "Address Copied",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    const mobileView = useBreakpointValue({ base: true, sm: false })

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
                    account
                        ? (account.ansName ? `${account.ansName}.apt` : ellipsize(account.address.toString()))
                        : 'Connect Wallet'
                }
            </MenuButton>
            <MenuList
                bg='background.500'
            >
                {
                    connected ? (
                        <>
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
                        </>
                    ) : (
                        wallets.map(wallet => (
                            <MenuItem
                                key={wallet.name}
                                onClick={() => onConnect(wallet)}
                                icon={<Image src={wallet.icon} boxSize={6} alt={wallet.name} />}
                                fontWeight="medium"
                                alignItems='center'
                                bg='transparent'
                                color='white'
                                _hover={{
                                    bg: 'whiteAlpha.100',
                                }}
                            >
                                <Flex
                                    justifyContent='space-between'
                                    alignItems='center'
                                    gap={4}
                                >
                                    {wallet.name}
                                </Flex>
                            </MenuItem>
                        ))
                    )
                }
                
            </MenuList>
        </Menu>
    )
}

export default ConnectWallet
