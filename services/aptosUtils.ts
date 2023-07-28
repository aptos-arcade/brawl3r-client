import {Module} from "@/types/Module";

export const moduleToString = (module: Module) => {
    return `${module.module_address}::${module.module_name}`
}

export const canonicalAddress = (address: string) => address.padEnd(66, "0");

export const fetchANS = async (address: string) => {
    const response = await fetch(`https://www.aptosnames.com/api/mainnet/v1/primary-name/${address}`);
    const { name } = await response.json();
    if(name) return `${name}.apt`;
    return "";
}