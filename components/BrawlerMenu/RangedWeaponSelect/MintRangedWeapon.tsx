import React from 'react';
import Button from "@/components/Utilities/Button";

interface Props {
    mintRangedWeapon: () => Promise<void>
}

const MintRangedWeapon: React.FC<Props> = ({ mintRangedWeapon }) => {
    return (
        <Button
            buttonType={'primary'}
            onClick={mintRangedWeapon}
        >
            Mint Ranged Weapon
        </Button>
    );
};

export default MintRangedWeapon;
