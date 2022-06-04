import styles from "./App.module.sass";
import { Home } from "./pages/home";
import { useTheme } from "./themes";
import { Route, Routes } from "react-router";
import { Header } from "components/header";
import { useChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import { Transaction, TransactionsProvider } from "libs/transactions";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useCallback } from "react";

const queryClient = new QueryClient();

const Main = () => {
  const [theme] = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const onCompleted = useCallback(
    (transaction: Transaction) => {
      enqueueSnackbar(`Completed ${transaction.txHash}`);
    },
    [enqueueSnackbar]
  );

  return (
    <TransactionsProvider onCompleted={onCompleted}>
      <main className={styles.root} data-theme={theme}>
        <Header />
        <section className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </section>
      </main>
    </TransactionsProvider>
  );
};

const App = () => {
  const chainOptions = useChainOptions();

  return (
    chainOptions && (
      <WalletProvider
        {...chainOptions}
        connectorOpts={{ bridge: "https://walletconnect.terra.dev/" }}
      >
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Main />
          </SnackbarProvider>
        </QueryClientProvider>
      </WalletProvider>
    )
  );
};

export default App;
