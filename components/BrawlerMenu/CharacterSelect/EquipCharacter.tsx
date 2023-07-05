import React from 'react';

import Button from "@/components/Utilities/Button";

import { TokenId } from "@/types/Token";

interface Props {
    character: TokenId
    equipCharacter: () => Promise<void>
}

const EquipCharacter: React.FC<Props> = ({ character, equipCharacter }) => {
    return (
        <Button
            buttonType={'primary'}
            onClick={equipCharacter}
        >
            Equip {character.tokenDataId.name}
        </Button>
    );
};

export default EquipCharacter;
