import { useContext } from "react";
import { appState } from "../../appState";
import { instantiateManifest } from "../../manifests/instantiate";
import styles from './style.module.css';

const instantiateComponent = async function ({
    packageAddress,
    accountAddress,
    setState,
    rdt
}) {

    const manifest = instantiateManifest(
        packageAddress,
        accountAddress
    );
    console.log("Instantiate Manifest: ", manifest);

    // Send manifest to wallet for signing
    const result = await rdt.walletApi.sendTransaction({
        transactionManifest: manifest,
        version: 1,
    });
    if (result.isErr()) throw result.error;
    console.log("Instantiate Result: ", result.value);

    // Fetch the transaction status from the Gateway API
    const transactionStatus = await rdt.gatewayApi.transaction.getStatus(
        result.value.transactionIntentHash
    );
    console.log("Instantiate transaction status:", transactionStatus);

    // Fetch the details of changes committed to ledger from Gateway API
    const committedDetails = await rdt.gatewayApi.transaction.getCommittedDetails(
        result.value.transactionIntentHash
    );
    console.log("Instantiate committed details:", committedDetails);

    // Set addresses from details committed to the ledger in the transaction
    const componentAddress = committedDetails.transaction.affected_global_entities[1];
    const ownerBadgeAddress = committedDetails.transaction.affected_global_entities[3];
    const adminResourceAddress =
        committedDetails.transaction.affected_global_entities[4];

    setState((prev) => ({
        ...prev,
        componentAddress,
        ownerBadgeAddress,
        adminResourceAddress,
    }))
};

export const HomePage = () => {
    const [{
        rdt,
        account,
        componentAddress,
        packageAddress },
        setState] = useContext(appState);

    return <div>
        <div className="flex">

            {rdt ? <button onClick={() => instantiateComponent({
                rdt,
                accountAddress: account && account.address,
                packageAddress,
                setState,
            })} id="instantiateComponent">Instantiate Component</button> :
                <h2 style={{ color: "white" }}> Ensure Radix Dapp Toolkit details are filled in!</h2>
            }

        </div>
        <div className={styles.detailContainer}>
            <p>Component address:</p>
            <pre id="componentAddress">{componentAddress || "None"}</pre>
        </div>
        <div className={styles.detailContainer}>
            <p>Account Address:</p>
            <pre id="accountAddress">{(account && account.address) || "None"}</pre>
        </div>
        <div className={styles.detailContainer}>
            <p>Package address:</p>
            <pre id="packageAddress">{packageAddress || "None"}</pre>
        </div>
    </div >
}
