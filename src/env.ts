import { CW20Addr } from "types";

export interface ContractAddresses {
  counter: CW20Addr;
}

export const CONTRACT_ADDRESSES: Record<
  "mainnet" | "testnet",
  ContractAddresses
> = {
  mainnet: {
    counter:
      "terra1mw5xqagvl4vrp7umkpauz6edt4glt9s64z604n7vfale7kzlnrds4esw2a" as CW20Addr,
  },
  testnet: {
    counter:
      "terra1mw5xqagvl4vrp7umkpauz6edt4glt9s64z604n7vfale7kzlnrds4esw2a" as CW20Addr,
  },
};
