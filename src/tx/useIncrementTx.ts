import { MsgExecuteContract } from "@terra-money/terra.js";
import { CONTRACT_ADDRESS } from "env";
import { useTx, UseTxOptions } from "./useTx";

interface IncrementTxProps extends UseTxOptions {}

const useIncrementTx = () => {
  return useTx<IncrementTxProps>((options) => {
    const { wallet } = options;
    return {
      msgs: [
        new MsgExecuteContract(
          wallet.walletAddress,
          CONTRACT_ADDRESS,
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
