import React from 'react';

import Button from "@/components/Utilities/Button";

import useCreateBrawler from "@/hooks/useCreateBrawler";

const PlayerCreation: React.FC = () => {

    const { createPlayer } = useCreateBrawler()

    return (
        <Button
            buttonType={'primary'}
            onClick={createPlayer}
        >
            Create Brawler
        </Button>
    );
};

export default PlayerCreation;
