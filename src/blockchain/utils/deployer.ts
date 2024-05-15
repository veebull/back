import { TonClient4, WalletContractV4 } from '@ton/ton'
import { mnemonicToPrivateKey } from "ton-crypto";

export async function deployerInit()
{

    //create client for testnet sandboxv4 API - alternative endpoint
    const client4 = new TonClient4({
        endpoint: "https://mainnet-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString(); // 🔴 Change to your own, by creating .env file!
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const secretKey = keyPair.secretKey;
    const workchain = 0; //we are working in basechain.
    const deployer_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    console.log(deployer_wallet.address);
    const deployer_wallet_contract = client4.open(deployer_wallet);

    return {
        deployer_wallet_contract,
        secretKey,
        workchain,
        client4
    }
} 