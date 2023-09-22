import React from 'react'

import {Kbd, VStack, Text} from '@chakra-ui/react'

import {Key as KeyType} from '@/types/Controls'

interface Props {
    keyData: KeyType
}

const Key: React.FC<Props> = ({ keyData }) => {

    return (
        <VStack>
            <Kbd
                fontSize='16px'
                fontFamily={`'Press Start 2P', sans-serif`}
                color='white'
                bg='transparent'
                p={2}
                tabIndex={-1}
            >
                {keyData.key}
            </Kbd>
            <Text
                fontSize='10px'
                color='white'
            >
                {keyData.name}
            </Text>
        </VStack>
    )
}

export default Key