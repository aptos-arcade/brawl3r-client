import React from 'react'

import {HStack, Flex, Text, VStack, Divider} from '@chakra-ui/react'

import Key from './Key'

import {Controls} from "@/types/Controls";

interface Props {
    control: Controls,
    divider: boolean,
}

const Control: React.FC<Props> = ({ control, divider }) => {

    return (
        <Flex
            gap={4}
            flex={1}
        >
            <Flex
                flex={1}
                flexDirection='column'
                alignItems='center'
                gap={4}
            >
                {control.title && (
                    <Text
                        fontSize='lg'
                        fontWeight='bold'
                    >
                        {control.title}
                    </Text>
                )}
                <VStack
                    h={'100%'}
                    justifyContent={'center'}
                    spacing={4}
                >
                    {
                        control.keys.map((controlsSet, index) => (
                            <>
                                <HStack
                                    key={index}
                                >
                                    {
                                        controlsSet.map((key) => (
                                            <Key
                                                keyData={key}
                                                key={key.name}
                                            />
                                        ))
                                    }
                                </HStack>
                                {index !== control.keys.length - 1 && <Divider />}
                            </>
                        ))
                    }
                </VStack>
            </Flex>
            {
                divider && (
                    <Divider
                        orientation='vertical'
                    />
                )
            }
        </Flex>
    )
}

export default Control