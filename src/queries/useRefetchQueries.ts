import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { TX_KEY } from "tx";
import { QUERY_KEY } from "./queryKey";

type QueryRefetchMap = Record<TX_KEY, QUERY_KEY[]>;

const QUERY_REFETCH_MAP: QueryRefetchMap = {
  [TX_KEY.INCREMENT]: [QUERY_KEY.COUNT],
  [TX_KEY.RESET]: [QUERY_KEY.COUNT],
};

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (txKey: TX_KEY) => {
      if (QUERY_REFETCH_MAP[txKey]) {
        for (const queryRefetch of QUERY_REFETCH_MAP[txKey]) {
          queryClient.invalidateQueries(queryRefetch, {
            refetchActive: true,
            refetchInactive: false,
          });
        }
      }
    },
    [queryClient]
  );
};
