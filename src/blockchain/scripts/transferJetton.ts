import { Address, beginCell, contractAddress, toNano, internal, fromNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { JETTON_PARAMS, MAX_SUPPLY } from "../utils/constants"
import { printSeparator } from "../utils/print";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { mnemonicToPrivateKey } from "ton-crypto";
import { deployerInit } from "../utils/deployer"
// ========================================
import { SampleJetton, storeTokenTransfer } from "../wrappers/SampleJetton";
// ========================================
import dotenv from 'dotenv';
dotenv.config();


export async function run(tokensForTransfer: string, toAddress: string ) {

    const newOwnerOfTokensAddress = Address.parse(toAddress); // 🔴 Owner should usually be the deploying wallet's address.
    
    const {deployer_wallet_contract, workchain, secretKey, client4} = await deployerInit()
    // const client4 = new TonClient4({
    //     endpoint: "https://mainnet-v4.tonhubapi.com",
    // });
    // const mnemonics = (process.env.MNEMONICS || "").toString(); // 🔴 Change to your own, by creating .env file!
    // // const mnemonics = "notice alien tourist shell beach brand fold hollow inmate forum avocado frame away coyote lock tiny humor trial crop syrup again rotate leopard riot" // 🔴 Change to your own, by creating .env file!
    // console.log("mnemonics", mnemonics)
    // const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    // const secretKey = keyPair.secretKey;
    // const workchain = 0; //we are working in basechain.
    // const deployer_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    // console.log("deployer_wallet.address",deployer_wallet.address);
    // const deployer_wallet_contract = client4.open(deployer_wallet);
    
    // Create content Cell
    const content = buildOnchainMetadata(JETTON_PARAMS);
    
    // let contentCell = beginCell().storeBuffer(Buffer.from("b5ee9c7201020b0100010500010300c00102012002030143bff082eb663b57a00192f4a6ac467288df2dfeddb9da1bee28f6521c8bebd21f1ec004020120050600940068747470733a2f2f77372e706e6777696e672e636f6d2f706e67732f3437332f34302f706e672d7472616e73706172656e742d7777772d69636f6e2d7468756d626e61696c2e706e6702012007080142bf89046f7a37ad0ea7cee73355984fa5428982f8b37c8f7bcec91f7ac71a7cd1040a0141bf4546a6ffe1b79cfdd86bad3db874313dcde2fb05e6a74aa7f3552d9617c79d13090141bf6ed4f942a7848ce2cb066b77a1128c6a1ff8c43f438a2dce24612ba9ffab8b03090008005757570018005757572e5757572e575757")).endCell();
    // let contentCell = beginCell().storeBit(0).storeUint(0, 32).storeStringTail("b5ee9c7201020b0100010500010300c00102012002030143bff082eb663b57a00192f4a6ac467288df2dfeddb9da1bee28f6521c8bebd21f1ec004020120050600940068747470733a2f2f77372e706e6777696e672e636f6d2f706e67732f3437332f34302f706e672d7472616e73706172656e742d7777772d69636f6e2d7468756d626e61696c2e706e6702012007080142bf89046f7a37ad0ea7cee73355984fa5428982f8b37c8f7bcec91f7ac71a7cd1040a0141bf4546a6ffe1b79cfdd86bad3db874313dcde2fb05e6a74aa7f3552d9617c79d13090141bf6ed4f942a7848ce2cb066b77a1128c6a1ff8c43f438a2dce24612ba9ffab8b03090008005757570018005757572e5757572e575757").endCell();

    // Compute init data for deployment
    // NOTICE: the parameters inside the init functions were the input for the contract address
    // which means any changes will change the smart contract address as well.

    const init = await SampleJetton.init(deployer_wallet_contract.address, content, MAX_SUPPLY);
    let jettonMaster = contractAddress(workchain, init); // получаем адрес контракта
    console.log("jetton_masterWallet_address",jettonMaster)
    
    let contract_dataFormat = SampleJetton.fromAddress(jettonMaster);
    let contract = client4.open(contract_dataFormat);
    let jetton_wallet = await contract.getGetWalletAddress(deployer_wallet_contract.address);

    console.log("✨ " + deployer_wallet_contract.address + "'s JettonWallet ==> ");
    // ✨Pack the forward message into a cell
    const test_message_left = beginCell()
        .storeBit(0) // 🔴  whether you want to store the forward payload in the same cell or not. 0 means no, 1 means yes.
        .storeUint(0, 32)
        .storeBuffer(Buffer.from("Hello, GM -- Left.", "utf-8"))
        .endCell();

    // const test_message_right = beginCell()
    //     .storeBit(1) // 🔴 whether you want to store the forward payload in the same cell or not. 0 means no, 1 means yes.
    //     .storeRef(beginCell().storeUint(0, 32).storeBuffer(Buffer.from("Hello, GM. -- Right", "utf-8")).endCell())
    //     .endCell();

    // ========================================
    let forward_string_test = beginCell().storeBit(1).storeUint(0, 32).storeStringTail("EEEEEE").endCell();
    let packed = beginCell()
        .store(
            storeTokenTransfer({
                $$type: "TokenTransfer",
                queryId: BigInt(0),
                amount: toNano(tokensForTransfer),
                destination: newOwnerOfTokensAddress,
                response_destination: deployer_wallet_contract.address, // Original Owner, aka. First Minter's Jetton Wallet
                custom_payload: forward_string_test,
                forward_ton_amount: toNano("0.000000001"),
                forward_payload: test_message_left,
            })
        )
        .endCell();

    let deployAmount = toNano("0.3");
    let seqno: number = await deployer_wallet_contract.getSeqno();
    let balance: bigint = await deployer_wallet_contract.getBalance();
    // ========================================
    printSeparator();
    console.log("Current deployment wallet balance: ", fromNano(balance).toString(), "💎TON");
    console.log("\n🛠️ Calling To JettonWallet:\n" + jetton_wallet + "\n");
    try {
        await deployer_wallet_contract.sendTransfer({
            seqno,
            secretKey,
            messages: [
                internal({
                    to: jetton_wallet,
                    value: deployAmount,
                    init: {
                        code: init.code,
                        data: init.data,
                    },
                    bounce: true,
                    body: packed,
                }),
            ],
        });
    } catch (error) {
        console.error(error)
        return {succcess:false}
    }

    return {success:true}
};

// run("100000", "UQAMlA3gW7qHfO6yQ7of3MkgFXEbBx4nuF7DdH4KRCyjcSQk")