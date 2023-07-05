import React from 'react';

import {Flex} from "@chakra-ui/react";

import {GiRetroController} from "react-icons/gi";
import {AiOutlineFullscreen} from "react-icons/ai";

import GetStartedStep from "@/components/Game/GetStartedStep";

interface Props {
    requestFullscreen: (fullscreen: boolean) => void,
    onOpen: () => void,
}

const GetStarted: React.FC<Props> = ({ requestFullscreen, onOpen }) => {

    const controls = [
        {
            icon: <GiRetroController />,
            label: 'Controls',
            onClick: onOpen
        },
        {
            icon: <AiOutlineFullscreen />,
            label: 'Fullscreen',
            onClick: () => requestFullscreen(true)
        }
    ]

    return (
        <Flex
            gap={{base: 4, md: 8}}
            flexDirection={{base: 'column', md: 'row'}}
            alignItems={"center"}
        >
            {
                controls.map((control, index) => (
                    <GetStartedStep
                        key={index}
                        index={index}
                        onClick={control.onClick}
                        icon={control.icon}
                        label={control.label}
                    />
                ))
            }
        </Flex>
    );
};

export default GetStarted;
