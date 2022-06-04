import { TxInfo } from "@terra-money/terra.js";
import { LCDClient } from "@terra-money/terra.js/dist/client";
import { CancellationToken, None } from "../libs/cancellation";
import { sleep } from "utils";

declare module "@terra-money/terra.js" {
  export interface LCDClient {
    pollTx(
      txHash: string,
      cancellationToken: CancellationToken
    ): Promise<TxInfo | Error>;
  }
}

export class TxTimeoutError extends Error {
  constructor(message: string, readonly txhash: string) {
    super(message);
    this.name = "PollingTimeout";
  }

  toString = () => {
    return `[${this.name} txhash="${this.txhash}" message="${this.message}"]`;
  };
}

LCDClient.prototype.pollTx = async function (
  txHash: string,
  cancellationToken: CancellationToken = None
): Promise<TxInfo | Error> {
  const timeout = Date.now() + 20 * 1000;

  while (Date.now() < timeout && cancellationToken.cancelled() === false) {
    try {
      return await this.tx.txInfo(txHash);
    } catch (error: any) {
      if (
        "isAxiosError" in error &&
        [400, 404].includes(error.response.status)
      ) {
        // the tx was not yet found so try again after a delay
        await sleep(1000, cancellationToken);
        continue;
      }
      return new Error(error);
    }
  }

  return new TxTimeoutError(
    `Transaction queued. To verify the status, please check the transaction hash below.`,
    txHash
  );
};
