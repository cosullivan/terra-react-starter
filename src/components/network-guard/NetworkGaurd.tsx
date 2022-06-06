import { useWallet } from "@terra-money/wallet-provider";
import { UIElementProps } from "components/UIElementProps";

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const { network } = useWallet();

  if (network.name !== "testnet") {
    return <div>Wrong Network, please connect to the Testnet.</div>;
  }

  return <>{children}</>;
};
