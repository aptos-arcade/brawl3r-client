import React from 'react';
import Button from "@/components/Utilities/Button";

interface Props {
    weaponName: string,
    equipMeleeWeapon: () => Promise<void>
}

const EquipMeleeWeapon: React.FC<Props> = ({ weaponName, equipMeleeWeapon }) => {
    return (
        <Button
            buttonType={'primary'}
            onClick={equipMeleeWeapon}
        >
            Equip {weaponName}
        </Button>
    );
};

export default EquipMeleeWeapon;
