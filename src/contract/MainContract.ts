/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import {
  Address,
  beginCell,
  Cell,
  Contract,
  ContractProvider,
  Sender,
  SendMode,
} from "@ton/core";

export class MainContract implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new MainContract(address);
  }

  // eslint-disable-next-line class-methods-use-this
  async sendDeposit(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      queryID?: number;
    },
  ) {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      const BET_OP = 0x00000001;

      await provider.internal(via, {
        value: opts.value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell()
          .storeUint(BET_OP, 32)
          .storeUint(opts.queryID ?? 0, 64)
          .storeUint(currentTimestamp, 32)
          .endCell(),
      });

      return "ok";
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
