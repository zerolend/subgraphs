import { BigInt } from "@graphprotocol/graph-ts";
import { TokenBalance } from "../generated/schema";
import { DelegateVotesChanged as DelegateVotesChangedEvent } from "../generated/Staking_omnichain/Staking";

export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  let tokenBalance = TokenBalance.load(event.params.delegate.toHexString());
  if (!tokenBalance) {
    tokenBalance = new TokenBalance(event.params.delegate.toHexString());
    tokenBalance.balance_omni = event.params.newVotes;
    tokenBalance.balance_omni_lp = BigInt.fromI32(0);
  } else {
    tokenBalance.balance_omni = event.params.newVotes;
  }
  tokenBalance.save();
}

export function handleDelegateVotesChanged_lp(
  event: DelegateVotesChangedEvent
): void {
  let tokenBalance = TokenBalance.load(event.params.delegate.toHexString());
  if (!tokenBalance) {
    tokenBalance = new TokenBalance(event.params.delegate.toHexString());
    tokenBalance.balance_omni = BigInt.fromI32(0);
    tokenBalance.balance_omni_lp = event.params.newVotes;
  } else {
    tokenBalance.balance_omni_lp = event.params.newVotes;
  }
  tokenBalance.save();
}
