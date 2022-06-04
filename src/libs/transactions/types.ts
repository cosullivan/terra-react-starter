import { TxLog } from "@terra-money/terra.js";

export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export type TransactionPayload = {
  [key: string]: any;
};

type TransactionBase = {
  txHash: string;
  createdAt: number;
  payload: TransactionPayload;
};

type PendingTransaction = TransactionBase & {
  status: TransactionStatus.Pending;
};

type CompletedTransaction = TransactionBase & {
  status: TransactionStatus.Completed;
  logs: TxLog[];
};

type FailedTransaction = TransactionBase & {
  status: TransactionStatus.Failed;
  error: Error;
};

export type Transaction =
  | PendingTransaction
  | CompletedTransaction
  | FailedTransaction;
