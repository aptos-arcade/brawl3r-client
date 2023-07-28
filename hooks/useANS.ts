import { useState, useEffect, useCallback } from "react";

import {fetchANS as fetchANSService} from "../services/aptosUtils";

const useANS = (address: string) => {

    const [name, setName] = useState<string>("");

    const fetchANS = useCallback(async () => {
        const ans = await fetchANSService(address);
        if(ans) setName(ans);
    }, [address])

    useEffect(() => {
        fetchANS();
    }, [fetchANS])

    return {
        name,
    }
}

export default useANS