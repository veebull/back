import { toNano } from "@ton/ton";

export const JETTON_PARAMS = {
    name: "HoldTest",
    description: "The best coin ever",
    symbol: "HLDTST",
    image: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
};

export const MAX_SUPPLY = toNano(1000000000); // 🔴 Set the specific total supply in nano

export const CLIENT_ENDPOINT = "https://sandbox-v4.tonhubapi.com" // https://sandbox-v4.tonhubapi.com