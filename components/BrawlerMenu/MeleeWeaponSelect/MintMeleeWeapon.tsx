import React from 'react';
import Button from "@/components/Utilities/Button";

interface Props {
    mintMeleeWeapon: () => Promise<void>
}

const MintMeleeWeapon: React.FC<Props> = ({ mintMeleeWeapon }) => {
    return (
        <Button
            buttonType={'primary'}
            onClick={mintMeleeWeapon}
        >
            Mint Melee Weapon
        </Button>
    );
};

export default MintMeleeWeapon;
