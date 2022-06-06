import { useWallet } from "@terra-money/wallet-provider";
import { ContractAddresses, CONTRACT_ADDRESSES } from "env";
import { CW20Addr } from "types";

export const useContractAddress = (
  contract: keyof ContractAddresses
): CW20Addr => {
  const { network } = useWallet();

  if (network.name !== "mainnet" && network.name !== "testnet") {
    throw new Error(`Network ${network.name} is not supported`);
  }

  return CONTRACT_ADDRESSES[network.name][contract];
};
