import { Container } from "components/primitives/container";
import { CompletedTransaction } from "libs/transactions";

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
    <Container direction="column">
      <div>Completed</div>
      <div>{transaction.txHash}</div>
      <ul>
        {wasm?.attributes.map((attribute) => {
          return (
            <li
              key={attribute.key}
            >{`${attribute.key}: ${attribute.value}`}</li>
          );
        })}
      </ul>
    </Container>
  );
};
