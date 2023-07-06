import React from 'react'

import {Card, Text, useDisclosure, VStack} from '@chakra-ui/react';

import { Unity } from 'react-unity-webgl';

import GetStarted from "@/components/Game/GetStarted";
import ControlsModal from "@/components/ControlsModal";
import CircularProgress from "@/components/Utilities/CircularProgress";

import useGame from "@/hooks/useGame";

import controls from "@/data/controls";

const Game: React.FC = () => {

    const { isOpen, onClose, onOpen } = useDisclosure();

    const { unityProvider, requestFullscreen, isLoaded } = useGame();

    return (
        <>
            <ControlsModal
                isOpen={isOpen}
                onClose={onClose}
                controls={controls}
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
                                position='absolute'
                                left='50%'
                                top='50%'
                                transform='translate(-50%, -50%)'
                            >
                                <CircularProgress
                                    size='80px'
                                />
                                <Text
                                    textAlign={'center'}
                                >
                                    Loading can take a few seconds...
                                </Text>
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