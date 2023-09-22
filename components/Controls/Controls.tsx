import React from 'react';

import {Flex} from "@chakra-ui/react";

import Control from "@/components/Controls/Control";

import controls from "@/data/controls";

const Controls = () => {
    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            w='100%'
            gap={4}
            flexWrap='wrap'
        >
            {
                controls.map((control, index) => (
                    <Control
                        key={index}
                        control={control}
                        divider={index !== controls.length - 1}
                    />
                ))
            }
        </Flex>
    );
};

export default Controls;
