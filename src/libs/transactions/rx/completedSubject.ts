import { BehaviorSubject } from "rxjs";
import { distinctUntilKeyChanged, skip } from "rxjs/operators";
import { Transaction } from "../types";

const DEFAULT = {} as Transaction;

export const completedSubject = new BehaviorSubject<Transaction>(DEFAULT).pipe(
  distinctUntilKeyChanged("txHash"),
  skip(1)
);
