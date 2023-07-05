import React from 'react';
import Button from "@/components/Utilities/Button";

interface Props {
    weaponName: string,
    equipRangedWeapon: () => Promise<void>
}

const EquipRangedWeapon: React.FC<Props> = ({ weaponName, equipRangedWeapon }) => {
    return (
        <Button
            buttonType={'primary'}
            onClick={equipRangedWeapon}
        >
            Equip {weaponName}
        </Button>
    );
};

export default EquipRangedWeapon;
