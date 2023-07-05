import React from 'react';

import {Button as ChakraButton, ButtonProps} from "@chakra-ui/react";

type ButtonType = 'primary' | 'outline' | 'ghost';

type ButtonStyles = {
    [key in ButtonType]: ButtonProps
}

const buttonStyles: ButtonStyles = {
    primary: {
        color: '#1A202C',
        bg: 'blue.200',
        _hover: {
            bg: 'blue.300'
        }
    },
    outline: {
        variant: 'outline',
        color: 'blue.200',
        borderColor: 'blue.200',
        _hover: {
            bg: 'whiteAlpha.50'
        }
    },
    ghost: {
        variant: 'ghost',
        color: 'blue.200',
        _hover: {
            bg: 'whiteAlpha.50'
        }
    }
}

interface Props extends ButtonProps {
    buttonType: ButtonType;
}


const Button: React.FC<Props> = ({ buttonType, children, ...rest }) => {

    return (
        <ChakraButton
            {...buttonStyles[buttonType]}
            {...rest}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;
