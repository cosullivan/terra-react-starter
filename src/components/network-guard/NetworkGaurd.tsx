import { useConnectedWallet } from "@terra-money/wallet-provider";
import { UIElementProps } from "components/UIElementProps";

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const connectedWallet = useConnectedWallet();

  if (connectedWallet && connectedWallet.network.name !== "testnet") {
    return <div>Wrong Network, please connect to the Testnet.</div>;
  }

  return <>{children}</>;
};
