import {HStack, Text} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowDownIcon, ArrowBackIcon, ArrowUpIcon, SmallAddIcon } from '@chakra-ui/icons'

import {Controls} from "@/types/Controls";

const controls: Controls[] = [
    {
        title: 'Defense',
        keys: [
            [
                {
                    name: 'Shield',
                    key: 'L. Shift'
                }
            ],
            [
                {
                    name: 'Dodge L.',
                    key: (
                        <HStack>
                            <Text>L. Shift</Text>
                            <SmallAddIcon />
                            <ArrowBackIcon />
                        </HStack>
                    )
                },
            ],
            [
                {
                    name: 'Dodge R.',
                    key: (
                        <HStack>
                            <Text>L. Shift</Text>
                            <SmallAddIcon />
                            <ArrowForwardIcon />
                        </HStack>
                    )

                }
            ]
        ]
    },
    {
        title: 'Melee',
        keys: [
            [
                {
                    name: 'Up',
                    key: 'W'
                }
            ],
            [
                {
                    name: 'Left',
                    key: 'A'
                },
                {
                    name: 'Down',
                    key: 'S'
                },
                {
                    name: 'Right',
                    key: 'D'
                }
            ]
        ],
    },
    {
        title: 'Ranged',
        keys: [
            [
                {
                    name: 'Shoot',
                    key: 'Space'
                }
            ]
        ]
    },
    {
        title: 'Movement',
        keys: [
            [
                {
                    name: 'Jump',
                    key: <ArrowUpIcon />
                }
            ],
            [
                {
                    name: 'Left',
                    key: <ArrowBackIcon />
                },
                {
                    name: 'Drop/Fall',
                    key: <ArrowDownIcon />
                },
                {
                    name: 'Right',
                    key: <ArrowForwardIcon />
                }
            ],
            [
                {
                    name: 'Dash L.',
                    key: (
                        <HStack>
                            <ArrowBackIcon />
                            <SmallAddIcon />
                            <ArrowBackIcon />
                        </HStack>
                    )
                },
                {
                    name: 'Dash R.',
                    key: (
                        <HStack>
                            <ArrowForwardIcon />
                            <SmallAddIcon />
                            <ArrowForwardIcon />
                        </HStack>
                    )
                }
            ],
        ]
    }
]

export default controls