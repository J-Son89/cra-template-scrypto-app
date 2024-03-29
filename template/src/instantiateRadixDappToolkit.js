import { useEffect } from "react";
import {
    RadixDappToolkit,
    DataRequestBuilder,
    RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";

const dAppDefinitionAddress = process.env.REACT_APP_DAPP_DEFINITION_ADDRESS;
const applicationName = process.env.REACT_APP_APPLICATION_NAME;
const applicationVersion = process.env.REACT_APP_APPLICATION_VERSION;

const instantiateRadixDappToolkit = () => {
    if (dAppDefinitionAddress && applicationName && applicationVersion) {

        return RadixDappToolkit({
            dAppDefinitionAddress: dAppDefinitionAddress,
            networkId: process.env.REACT_APP_MAINNET === "1" ? RadixNetwork.Mainnet : RadixNetwork.Stokenet,
            applicationName: applicationName,
            applicationVersion: applicationVersion,
        });
    }
}

export const useWalletInit = (setAppState) => {
    const rdt = instantiateRadixDappToolkit()

    useEffect(() => {
        if (rdt){
            // ************ Connect to wallet and display details ************
            rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));
            // Subscribe to updates to the user's shared wallet data, then display the account name and address.
            rdt.walletApi.walletData$.subscribe((walletData) => {
                console.log("connected wallet data: ", walletData);
                // Set the account variable to the first and only connected account from the wallet
                
                setAppState((prev) => ({
                    ...prev,
                    walletData,
                    rdt,
                    account: walletData.accounts[0],
                }))
            })
        }
    }, [])
}
