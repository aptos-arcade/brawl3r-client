import React from 'react'

import {Card, Text, useDisclosure, VStack} from '@chakra-ui/react';

import { Unity } from 'react-unity-webgl';

import GetStarted from "@/components/Game/GetStarted";
import ControlsModal from "@/components/Controls/ControlsModal";
import CircularProgress from "@/components/Utilities/CircularProgress";
import Button from "@/components/Utilities/Button";

import useGame from "@/hooks/useGame";


const Game: React.FC = () => {

    const { isOpen, onClose, onOpen } = useDisclosure();

    const { unityProvider, requestFullscreen, isLoaded } = useGame();

    return (
        <>
            <ControlsModal
                isOpen={isOpen}
                onClose={onClose}
            />
            <VStack
                spacing={8}
            >
                <GetStarted
                    requestFullscreen={requestFullscreen}
                    onOpen={onOpen}
                />
                <Card
                    shadow='lg'
                    position='relative'
                    borderColor='blue.200'
                    borderWidth={2}
                    bg='transparent'
                    overflow='hidden'
                    w='100%'
                >
                    {
                        !isLoaded && (
                            <VStack
                                w={'100%'}
                                h={'100%'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                position={'absolute'}
                                p={4}
                                spacing={4}
                            >

                                <CircularProgress />
                                <Text>
                                    Loading Game...
                                </Text>
                                <Button
                                    buttonType={'primary'}
                                    onClick={onOpen}
                                >
                                    View Controls
                                </Button>
                            </VStack>
                        )
                    }
                    <Unity
                        unityProvider={unityProvider}
                        style={{
                            width: '100%',
                            aspectRatio: '16/9'
                        }}
                    />
                </Card>
            </VStack>
        </>
    )
}

export default Game