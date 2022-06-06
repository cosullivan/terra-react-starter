import { useQuery, UseQueryResult } from "react-query";
import { NetworkInfo, useWallet } from "@terra-money/wallet-provider";
import { QUERY_KEY } from "./queryKey";
import { LCDClient } from "@terra-money/terra.js/dist/client";
import { useContractAddress } from "hooks";
import { CW20Addr } from "types";

interface CountResponse {
  count: number;
}

const fetchCount = async (
  network: NetworkInfo,
  contractAddress: CW20Addr
): Promise<number> => {
  const lcd = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
  });

  const response = await lcd.wasm.contractQuery<CountResponse>(
    contractAddress,
    { get_count: {} }
  );

  return response.count;
};

export const useCountQuery = (): UseQueryResult<number> => {
  const { network } = useWallet();

  const contractAddress = useContractAddress("counter");

  return useQuery(
    [QUERY_KEY.COUNT, network],
    ({ queryKey }) => {
      return fetchCount(queryKey[1] as NetworkInfo, contractAddress);
    },
    {
      refetchOnMount: true,
    }
  );
};
