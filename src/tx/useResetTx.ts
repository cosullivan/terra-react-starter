import { MsgExecuteContract } from "@terra-money/terra.js";
import { useContractAddress } from "hooks";
import { TX_KEY } from "./txKey";
import { useTx, UseTxOptions } from "./useTx";

interface ResetTxProps extends UseTxOptions {
  count: number;
}

const useResetTx = () => {
  const contractAddress = useContractAddress("counter");

  return useTx<ResetTxProps>(
    (options) => {
      const { wallet, count } = options;
      return {
        msgs: [
          new MsgExecuteContract(
            wallet.walletAddress,
            contractAddress,
            {
              reset: {
                count,
              },
            },
            []
          ),
        ],
      };
    },
    (options) => {
      return {
        txKey: TX_KEY.RESET,
      };
    }
  );
};

export { useResetTx };
