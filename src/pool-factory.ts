import { PoolCreated as PoolCreatedEvent } from "../generated/PoolFactory/PoolFactory";
import { Pool as PoolTemplate } from "../generated/templates";
import { Pool } from "../generated/schema";

export function handlePoolCreated(event: PoolCreatedEvent): void {
  // Create a new Pool entity
  let pool = new Pool(event.params.pool.toHexString());

  // Set pool details from event parameters
  pool.address = event.params.pool;
  pool.createdAtBlock = event.block.number;
  pool.createdAtTimestamp = event.block.timestamp;

  // Save the new Pool entity to the store
  pool.save();

  // Create a new dynamic data source for this pool
  PoolTemplate.create(event.params.pool);
}
