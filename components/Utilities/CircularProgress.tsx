import React from 'react';

import {CircularProgressProps, CircularProgress as ChakraCircularProgress} from "@chakra-ui/react";


const CircularProgress: React.FC<CircularProgressProps> = (props) => {
    return (
        <ChakraCircularProgress
            isIndeterminate
            trackColor='transparent'
            color='blue.200'
            {...props}
        />
    );
};

export default CircularProgress;
