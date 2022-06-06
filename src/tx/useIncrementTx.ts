import { MsgExecuteContract } from "@terra-money/terra.js";
import { useContractAddress } from "hooks";
import { TX_KEY } from "./txKey";
import { useTx, UseTxOptions } from "./useTx";

interface IncrementTxProps extends UseTxOptions {}

const useIncrementTx = () => {
  const contractAddress = useContractAddress("counter");

  return useTx<IncrementTxProps>(
    (options) => {
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
    },
    (options) => {
      return {
        txKey: TX_KEY.INCREMENT,
      };
    }
  );
};

export { useIncrementTx };
