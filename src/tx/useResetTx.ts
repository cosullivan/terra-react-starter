import { MsgExecuteContract } from "@terra-money/terra.js";
import { CONTRACT_ADDRESS } from "env";
import { useTx, UseTxOptions } from "./useTx";

interface ResetTxProps extends UseTxOptions {
  count: number;
}

const useResetTx = () => {
  return useTx<ResetTxProps>((options) => {
    const { wallet, count } = options;
    return {
      msgs: [
        new MsgExecuteContract(
          wallet.walletAddress,
          CONTRACT_ADDRESS,
          {
            reset: {
              count,
            },
          },
          []
        ),
      ],
    };
  });
};

export { useResetTx };
