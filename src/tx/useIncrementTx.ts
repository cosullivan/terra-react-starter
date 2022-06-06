import { MsgExecuteContract } from "@terra-money/terra.js";
import { useContractAddress } from "hooks";
import { useTx, UseTxOptions } from "./useTx";

interface IncrementTxProps extends UseTxOptions {}

const useIncrementTx = () => {
  const contractAddress = useContractAddress("counter");

  return useTx<IncrementTxProps>((options) => {
    const { wallet } = options;
    return {
      msgs: [
        new MsgExecuteContract(
          wallet.walletAddress,
          contractAddress,
          {
            increment: {},
          },
          []
        ),
      ],
    };
  });
};

export { useIncrementTx };
