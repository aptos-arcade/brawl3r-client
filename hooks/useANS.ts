import { useState, useEffect, useCallback } from "react";

const useANS = (address: string) => {

    const [name, setName] = useState<string>("");

    const fetchANS = useCallback(async () => {
        const response = await fetch(`https://www.aptosnames.com/api/mainnet/v1/primary-name/${address}`);
        const { name } = await response.json();
        if(name) setName(`${name}.apt`);
    }, [address])

    useEffect(() => {
        fetchANS();
    }, [fetchANS])

    return {
        name,
    }
}

export default useANS