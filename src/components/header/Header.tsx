import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Container } from "components/primitives/container";
import { ThemeToggle } from "./ThemeToggle";
import { Transactions } from "./Transactions";
import { Wallet } from "./Wallet";
import styles from "./Header.module.sass";

const Header = () => {
  const connectedWallet = useConnectedWallet();

  return (
    <Container className={styles.root} direction="row" component="header">
      {connectedWallet && <Transactions className={styles.transactions} />}
      <Wallet className={styles.wallet} />
      <ThemeToggle className={styles.themeToggle} />
    </Container>
  );
};

export { Header };
