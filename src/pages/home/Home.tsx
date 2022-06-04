import { useConnectedWallet } from "@terra-money/wallet-provider";
import { QUERY_KEY, useCountQuery } from "queries";
import { Container } from "components/primitives/container";
import { useIncrementTx, useResetTx } from "tx";
import { useQueryClient } from "react-query";
import styles from "./Home.module.sass";

const Home = () => {
  const connectedWallet = useConnectedWallet();

  const queryClient = useQueryClient();

  const [reset, resetTx] = useResetTx();

  const [increment, incrementTx] = useIncrementTx();

  const { data: count } = useCountQuery();

  return (
    <div className={styles.root}>
      {count !== undefined && (
        <div>
          <h1>{`Count: ${count}`}</h1>
        </div>
      )}
      {connectedWallet && (
        <Container>
          <button
            className={styles.button}
            disabled={reset.loading || increment.loading}
            onClick={async () => {
              await incrementTx({ wallet: connectedWallet });
              queryClient.invalidateQueries(QUERY_KEY.COUNT);
            }}
          >
            Increment
          </button>
          <button
            className={styles.button}
            disabled={reset.loading || increment.loading}
            onClick={async () => {
              await resetTx({ wallet: connectedWallet, count: 0 });
              queryClient.invalidateQueries(QUERY_KEY.COUNT);
            }}
          >
            Reset
          </button>
        </Container>
      )}
    </div>
  );
};

export { Home };
