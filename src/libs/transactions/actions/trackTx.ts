import { LCDClient } from "@terra-money/terra.js";
import { TxState } from "../TxState";
import { find } from "../utils/find";
import { ActionType, TxDispatch, TxThunkArgument } from "./types";
import "extensions/lcd";
import { CancellationTokenSource } from "libs/cancellation";

const trackTx = async (
  txHash: string,
  lcd: LCDClient,
  dispatch: TxDispatch,
  getState: () => TxState,
  args: TxThunkArgument
) => {
  const cancellationToken = new CancellationTokenSource();

  // if the tx has been cancelled elsewhere in the
  // app then we can cancel the pending operation
  const unsubscribe = args.cancelled.subscribe((tx) => {
    if (tx.txHash === txHash) {
      cancellationToken.cancel();
    }
  });

  const txInfoOrError = await lcd.pollTx(txHash, cancellationToken);

  unsubscribe.unsubscribe();

  if (txInfoOrError instanceof Error) {
    dispatch({
      type: ActionType.Failed,
      payload: {
        txHash,
        error: txInfoOrError,
      },
    });
    const transaction = find(getState(), txHash);
    if (transaction) {
      args.failed.next(transaction);
    }
    return;
  }

  dispatch({
    type: ActionType.Complete,
    payload: {
      txHash,
      logs: txInfoOrError.logs ?? [],
    },
  });

  const transaction = find(getState(), txHash);
  if (transaction) {
    args.completed.next(transaction);
  }
};

export { trackTx };
