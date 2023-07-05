import React, {useState} from 'react';

import {HStack, Text} from "@chakra-ui/react";

import Button from "@/components/Utilities/Button";

interface Props {
    label: string,
    onClick: () => void,
    icon: React.ReactElement,
    index: number
}

const GetStartedStep: React.FC<Props> = ({ label, onClick, icon, index }) => {

    const [clicked, setClicked] = useState(false);

    const onClickHandler = () => {
        onClick();
        setClicked(true);
    }

    return (
        <HStack
            spacing={4}
        >
            <Text
                color={clicked ? 'gray.400' : 'blue.200'}
                fontSize='lg'
            >
                {index + 1}
            </Text>
            <Button
                buttonType={clicked ? 'outline' : 'primary'}
                onClick={onClickHandler}
                leftIcon={icon}
            >
                {label}
            </Button>
        </HStack>
    );
};

export default GetStartedStep;
