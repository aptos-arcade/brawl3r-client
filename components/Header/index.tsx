import React from 'react'

import { Heading, VStack, Text } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <VStack
      spacing={4}
    >
        <Heading
            fontSize="48px"
            fontWeight="bold"
            color='blue.200'
            textAlign={'center'}
        >
            BRAWL3R
        </Heading>
        <Text
          color='white'
          textAlign='center'
        >
            Where your Aptos NFTs come to life!
        </Text>
    </VStack>
  )
}

export default Header