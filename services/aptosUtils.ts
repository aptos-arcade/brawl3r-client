import {Module} from "@/types/Module";

export const moduleToString = (module: Module) => {
    return `${module.module_address}::${module.module_name}`
}

export const canonicalAddress = (address: string) => address.padEnd(66, "0")