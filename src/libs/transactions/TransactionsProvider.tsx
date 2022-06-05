import { createReducer } from "react-use";
import thunk from "redux-thunk";
import { transactionsReducer } from "./transactionsReducer";
import { TxDispatch, trackTxAction } from "./actions";
import { TxState } from "./TxState";
import { createContext, useContext, useEffect } from "react";
import { UIElementProps } from "components";
import { LocalStorageTxStore } from "./storage/LocalStorageTxStore";
import { createTxStoreMiddleware } from "./storage";
import { completedSubject, cancelledSubject, failedSubject } from "./rx";
import { useLCDClient } from "@terra-money/wallet-provider";
import {
  CompletedTransaction,
  FailedTransaction,
  PendingTransaction,
  TransactionStatus,
} from "./types";

const storage = new LocalStorageTxStore("__tx_store");

const useThunkReducer = createReducer<any, TxState>(
  thunk.withExtraArgument({
    completed: completedSubject,
    cancelled: cancelledSubject,
    failed: failedSubject,
  }),
  createTxStoreMiddleware(storage)
);

const initialState = {
  initialized: false,
  transactions: [],
};

const TransactionsContext = createContext<[TxState, TxDispatch] | undefined>(
  undefined
);

const useTransactionsContext = (): [TxState, TxDispatch] => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw Error("The TransactionsContext has not been defined.");
  }
  return context;
};

interface TransactionsProviderProps extends UIElementProps {
  onCompleted?: (transaction: CompletedTransaction) => void;
  onCancelled?: (transaction: PendingTransaction) => void;
  onFailed?: (transaction: FailedTransaction) => void;
}

const TransactionsProvider = (props: TransactionsProviderProps) => {
  const { children, onCompleted, onCancelled, onFailed } = props;

  const lcd = useLCDClient();

  const value = useThunkReducer(transactionsReducer, initialState, (state) => {
    return {
      ...state,
      initialized: true,
      transactions: storage.read(),
    };
  });

  // update the tracking status of the outstanding txs
  useEffect(() => {
    const [state, dispatch] = value;
    if (state.initialized) {
      state.transactions.forEach((transaction) => {
        dispatch(trackTxAction(transaction.txHash, lcd));
      });
    }
  }, [value[0].initialized]);

  useEffect(() => {
    const completed = completedSubject.subscribe((transaction) => {
      if (onCompleted && transaction.status === TransactionStatus.Completed) {
        onCompleted(transaction);
      }
    });

    const cancelled = cancelledSubject.subscribe((transaction) => {
      if (onCancelled && transaction.status === TransactionStatus.Pending) {
        onCancelled(transaction);
      }
    });

    const failed = failedSubject.subscribe((transaction) => {
      if (onFailed && transaction.status === TransactionStatus.Failed) {
        onFailed(transaction);
      }
    });

    return () => {
      completed.unsubscribe();
      cancelled.unsubscribe();
      failed.unsubscribe();
    };
  }, [onCompleted, onCancelled, onFailed]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsProvider, useTransactionsContext };
