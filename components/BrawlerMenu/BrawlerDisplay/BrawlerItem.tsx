import React from 'react';

import {VStack, Text} from "@chakra-ui/react";

interface Props {
    title: string,
    value: string,
    button: React.ReactNode,
}

const BrawlerItem: React.FC<Props> = ({ title, value, button}) => {
    return (
        <VStack
            spacing={4}
            borderWidth={2}
            borderRadius={8}
            p={4}
            flex={1}
            borderColor='blue.200'
            justifyContent={'space-between'}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                textAlign={'center'}
            >
                {title}
            </Text>
            <Text
                textAlign={'center'}
            >
                {value}
            </Text>
            {button}
        </VStack>
    );
};

export default BrawlerItem;
