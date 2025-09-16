import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '@fake-stack-overflow/shared';

// export * from '../../shared/src/types/types';
export * from '@fake-stack-overflow/shared';

/**
 * Type alias for the Socket.io Server instance.
 * - Handles communication between the client and server using defined events.
 */
export type FakeSOSocket = Server<ClientToServerEvents, ServerToClientEvents>;

// ---- Nim type augmentation (stay within server/types only) ------------------
declare module '@fake-stack-overflow/shared' {
  interface NimGameState {
    // Optional strings in mongoose may be null at runtime; widen accordingly
    player1?: string | null;
    player2?: string | null;
    // Your schema treats remainingObjects as optional; widen accordingly
    remainingObjects?: number;
  }
}
// ----------------------------------------------------------------------------
