import {moduleToString} from "@/services/aptosUtils";

import {ViewRequest} from "aptos/src/generated";

import {Module} from "@/types/Module";

export const viewRequest = (module: Module, functionName: string, args: string[], typeArgs: string[]): ViewRequest => ({
    function: `${moduleToString(module)}::${functionName}`,
    arguments: args,
    type_arguments: typeArgs
})