import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react"

import {AptosExtension, MagicAptosWallet} from "@magic-ext/aptos";
import {Extension, Magic} from "magic-sdk";
import {InstanceWithExtensions, SDKBase} from "@magic-sdk/provider";

interface ContextType {
    magicWallet: MagicAptosWallet | undefined;
    email: string;
    setEmail: (email: string) => void;
}

export const MagicContext = createContext<ContextType>({
    magicWallet: undefined,
    email: '',
    setEmail: () => {}
});

export const useMagic = () => useContext(MagicContext);

interface AptosContextProps {
    children: ReactNode;
}

export const MagicProvider : FC<AptosContextProps> = ({ children }) => {

    const [email, setEmail] = useState<string>('jason@hedmans.org');

    const [magic, setMagic] = useState<InstanceWithExtensions<SDKBase, [AptosExtension, Extension]> | undefined>();
    const [magicWallet, setMagicWallet] = useState<MagicAptosWallet | undefined>(undefined);

    useEffect(() => {
        setMagic(new Magic('pk_live_04343D91CDC3F445', {
            extensions: [
                new AptosExtension({
                    nodeUrl: 'https://fullnode.mainnet.aptoslabs.com'
                }),
            ],
        }))
    }, []);

    useEffect(() => {
        if(!magic) return;
        setMagicWallet(new MagicAptosWallet(magic, {
            connect: async () => {
                await magic.auth.loginWithMagicLink({ email });
                return await magic.aptos.getAccountInfo();
            }
        }))
    }, [magic, email]);

    if(!magicWallet) {
        return null;
    }

    return (
        <MagicContext.Provider
            value={{
                magicWallet,
                email,
                setEmail
            }}
        >
            {children}
        </MagicContext.Provider>
    )
}