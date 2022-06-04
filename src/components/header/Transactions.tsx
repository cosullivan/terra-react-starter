import classNames from "classnames";
import { UIElementProps } from "components/UIElementProps";
import { TransactionStatus, useTransactions } from "libs/transactions";
import styles from "./Transactions.module.sass";

export const Transactions = (props: UIElementProps) => {
  const { className } = props;

  const transactions = useTransactions(TransactionStatus.Pending);

  if (transactions.length > 0) {
    return (
      <div
        className={classNames(styles.button, className)}
      >{`${transactions.length} Pending`}</div>
    );
  }

  return null;
};
