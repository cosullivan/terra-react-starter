import {
  ConnectType,
  useConnectedWallet,
  useWallet,
} from "@terra-money/wallet-provider";
import { Container } from "components/primitives/container";
import { UIElementProps } from "components/UIElementProps";
import { truncateAddress } from "utils";
import styles from "./Wallet.module.sass";

export const Wallet = (props: UIElementProps) => {
  const { className } = props;

  const { connect, disconnect, connection } = useWallet();

  const connectedWallet = useConnectedWallet();

  return (
    <Container className={className}>
      {connectedWallet === undefined ? (
        <button
          className={styles.button}
          onClick={() => connect(ConnectType.EXTENSION)}
        >
          Connect
        </button>
      ) : (
        <button className={styles.button} onClick={disconnect}>
          {truncateAddress(connectedWallet.walletAddress)}
        </button>
      )}
    </Container>
  );
};
