import { Container } from "components/primitives/container";
import { CompletedTransaction } from "libs/transactions";
import styles from "./CompletedTransactionSnackbar.module.sass";

interface CompletedTransactionSnackbarProps {
  transaction: CompletedTransaction;
}

export const CompletedTransactionSnackbar = (
  props: CompletedTransactionSnackbarProps
) => {
  const { transaction } = props;

  const wasm = transaction.logs
    .flatMap((log) => log.events)
    .find((event) => event.type === "wasm");

  return (
    <Container className={styles.root} direction="column">
      <div>
        <strong>Completed</strong>
      </div>
      <div>{transaction.txHash}</div>
      <ul>
        {wasm?.attributes.map((attribute) => {
          return (
            <li key={attribute.key}>
              <div>
                <strong>{attribute.key}</strong>
              </div>
              <div>{attribute.value}</div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
