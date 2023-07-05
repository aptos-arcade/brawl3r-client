import React from 'react';

import {Td, Tr} from "@chakra-ui/react";

import AddressText from "@/components/Utilities/AddressText";

import {LeaderboardRow as LeaderboardRowType} from "@/types/LeaderboardRow";

interface Props {
    leaderboardRow: LeaderboardRowType;
    rank: number;
}

interface DataProps {
    children: React.ReactNode
}

const DataEntry: React.FC<DataProps> = ({ children }) => (
    <Td
        textAlign={'center'}
    >
        {children}
    </Td>
);

const LeaderboardRow: React.FC<Props> = ({ leaderboardRow, rank }) => {

    const { name, wins, losses, eloRating } = leaderboardRow;

    return (
        <Tr>
            <DataEntry>
                {rank}
            </DataEntry>
            <DataEntry>
                <AddressText
                    address={name}
                />
            </DataEntry>
            <DataEntry>
                {wins}
            </DataEntry>
            <DataEntry>
                {losses}
            </DataEntry>
            <DataEntry>
                {eloRating}
            </DataEntry>
        </Tr>
    );
};

export default LeaderboardRow;
