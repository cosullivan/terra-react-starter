import { useQuery, UseQueryResult } from "react-query";
import { NetworkInfo, useWallet } from "@terra-money/wallet-provider";
import { QUERY_KEY } from "./queryKey";
import { LCDClient } from "@terra-money/terra.js/dist/client";
import { CONTRACT_ADDRESS } from "env";

interface CountResponse {
  count: number;
}

const fetchCount = async (network: NetworkInfo): Promise<number> => {
  const lcd = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
  });

  const response = await lcd.wasm.contractQuery<CountResponse>(
    CONTRACT_ADDRESS,
    { get_count: {} }
  );

  return response.count;
};

export const useCountQuery = (): UseQueryResult<number> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.COUNT, network],
    ({ queryKey }) => {
      return fetchCount(queryKey[1] as NetworkInfo);
    },
    {
      refetchOnMount: true,
    }
  );
};
