/**
 * Represents a semantic message identifier (Command or Event).
 *
 * - Runtime: plain string (no overhead, no structure)
 * - Compile-time: carries the payload type via a phantom field
 *
 * This type is used to associate a message name with its expected payload
 * without enforcing any runtime shape or protocol.
 *
 * Example:
 * ```ts
 * const PROCESS_PAYLOAD =
 *   '[Payload.Process]' as MessageLike<Payload>
 * ```
 */

export type MessageLike<T> = string & { __payload?: T }
