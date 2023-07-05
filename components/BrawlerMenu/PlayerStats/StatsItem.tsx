import React from 'react';

import {VStack, Text} from "@chakra-ui/react";

interface Props {
    title: string,
    value: string
}

const StatsItem: React.FC<Props> = ({ title, value}) => {
    return (
        <VStack
            spacing={2}
            borderWidth={2}
            borderRadius={8}
            p={4}
            flex={1}
            borderColor='blue.200'
            w={'100%'}
        >
            <Text
                fontSize={'lg'}
                fontWeight={'medium'}
            >
                {title}
            </Text>
            <Text
                fontSize={'3xl'}
                fontWeight={'bold'}
            >
                {value}
            </Text>
        </VStack>
    );
};

export default StatsItem;
