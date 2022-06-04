import { CreateTxOptions } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import { ConnectedWallet } from "@terra-money/wallet-types";
import { useAsyncFn } from "react-use";
import {
  TransactionPayload,
  useTransactionsContext,
} from "../libs/transactions";
import { addTxAction } from "../libs/transactions/actions";

type TxOrFactory<Options extends UseTxOptions> =
  | CreateTxOptions
  | ((
      options: Omit<Options, "wallet"> & { wallet: ConnectedWallet }
    ) => CreateTxOptions);

type PayloadOrFactory<Options extends UseTxOptions> =
  | TransactionPayload
  | ((options: Options) => TransactionPayload);

export interface UseTxOptions {
  wallet: ConnectedWallet | undefined;
}

const useTx = <Options extends UseTxOptions>(
  txOrFactory: TxOrFactory<Options>,
  payloadOrFactory: PayloadOrFactory<Options> = {}
) => {
  const [, dispatch] = useTransactionsContext();

  const lcd = useLCDClient();

  return useAsyncFn(
    async (options: Options) => {
      const { wallet } = options;

      if (wallet === undefined || wallet.availablePost === false) {
        throw new Error(
          "The wallet is not connected or is unable to post a message."
        );
      }

      const tx =
        typeof txOrFactory === "function"
          ? txOrFactory({ ...options, wallet })
          : txOrFactory;

      const txResult = await wallet.post(tx);

      const payload =
        typeof payloadOrFactory === "function"
          ? payloadOrFactory(options)
          : payloadOrFactory;

      await dispatch(addTxAction(txResult.result.txhash, payload, lcd));
    },
    [lcd]
  );
};

export { useTx };
