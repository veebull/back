// import { toNano } from '@ton/core';
import { TonClient4, Address, contractAddress, toNano, beginCell, fromNano, internal } from '@ton/ton'
import { mnemonicToPrivateKey } from "ton-crypto";
import { SampleJetton, storeMint } from '../wrappers/SampleJetton';
import { NetworkProvider } from '@ton/blueprint';
import { printSeparator } from "../utils/print";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { JETTON_PARAMS, CLIENT_ENDPOINT, MAX_SUPPLY } from "../utils/constants";
import { deployerInit } from "../utils/deployer"

import * as dotenv from "dotenv";
dotenv.config();

/*
*   @params tokensForMint
*   @params toAddress
*   @params selfMint
*/
export async function run(tokensForMint: string, toAddress: string, selfMint: boolean) {
    
    const {deployer_wallet_contract, workchain, secretKey} = await deployerInit()

    const mintToAddress = selfMint ? deployer_wallet_contract.address : Address.parse(toAddress)

    // Create content Cell
    let content = buildOnchainMetadata(JETTON_PARAMS);
    // const address = Address.parse(args.length > 0 ? args[0] : await ui.input('CounterExample address'));

    const init = await SampleJetton.init(deployer_wallet_contract.address, content, MAX_SUPPLY);
    let jettonMaster = contractAddress(workchain, init);
    let deployAmount = toNano("0.15");

    console.log("deployer_wallet_contract.address",deployer_wallet_contract.address)

    let supply = toNano(tokensForMint); // 🔴 Specify total supply in nano
    let packed_msg = beginCell()
        .store(
            storeMint({
                $$type: "Mint",
                amount: supply,
                receiver: mintToAddress,
            })
        )
        .endCell();

    // send a message on new address contract to deploy it
    let seqno: number = await deployer_wallet_contract.getSeqno();
    console.log("🛠️Preparing new outgoing massage from deployment wallet. \n" + deployer_wallet_contract.address);
    console.log("Seqno: ", seqno + "\n");
    printSeparator();


    // Get deployment wallet balance
    let balance: bigint = await deployer_wallet_contract.getBalance();

    console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON");
    console.log("Minting:: ", fromNano(supply));
    printSeparator();
    try {
        await deployer_wallet_contract.sendTransfer({
            seqno,
            secretKey,
            messages: [
                internal({
                    to: jettonMaster,
                    value: deployAmount,
                    init: {
                        code: init.code,
                        data: init.data,
                    },
                    body: packed_msg,
                }),
            ],
        });
        
    } catch (error) {
        console.error(error)
        return {success: false}
    }
    console.log("====== Deployment message sent to =======\n", jettonMaster);
    return {succcess: true}

}

// run("<AMOUNT_OF_TOKENS>", "<MINT_TO_ADDRESS>", false)