import { Supply, Borrow, Repay, Withdraw, Pool } from "../generated/schema";
import {
  Supply as SupplyEvent,
  Borrow as BorrowEvent,
  Repay as RepayEvent,
  Withdraw as WithdrawEvent,
} from "../generated/templates/Pool/pool";

export function handleSupply(event: SupplyEvent): void {
  let pool = Pool.load(event.address.toHexString());
  if (pool === null) {
    pool = new Pool(event.address.toHexString());
    pool.address = event.address;
  }

  let supply = new Supply(event.transaction.hash.toHexString());
  supply.pool = pool.id;
  supply.user = event.params.user;
  supply.amount = event.params.amount;
  supply.timestamp = event.block.timestamp;

  supply.save();
  pool.save();
}

export function handleBorrow(event: BorrowEvent): void {
  let borrow = new Borrow(event.transaction.hash.toHexString());
  borrow.pool = event.address.toHexString();
  borrow.user = event.params.user;
  borrow.amount = event.params.amount;
  borrow.timestamp = event.block.timestamp;

  borrow.save();
}

export function handleRepay(event: RepayEvent): void {
  let repay = new Repay(event.transaction.hash.toHexString());
  repay.pool = event.address.toHexString();
  repay.user = event.params.user;
  repay.amount = event.params.amount;
  repay.timestamp = event.block.timestamp;

  repay.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let withdraw = new Withdraw(event.transaction.hash.toHexString());
  withdraw.pool = event.address.toHexString();
  withdraw.user = event.params.user;
  withdraw.amount = event.params.amount;
  withdraw.timestamp = event.block.timestamp;

  withdraw.save();
}
