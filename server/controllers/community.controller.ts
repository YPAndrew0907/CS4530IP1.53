import express, { Response } from 'express';
import {
  FakeSOSocket,
  CommunityIdRequest,
  CreateCommunityRequest,
  ToggleMembershipRequest,
  DeleteCommunityRequest,
} from '../types/types';
import {
  getCommunity,
  getAllCommunities,
  toggleCommunityMembership,
  createCommunity,
  deleteCommunity,
} from '../services/community.service';

/**
 * This controller handles community-related routes.
 * @param socket The socket instance to emit events.
 * @returns {express.Router} The router object containing the community routes.
 * @throws {Error} Throws an error if the community operations fail.
 */
const communityController = (socket: FakeSOSocket) => {
  const router = express.Router();

  /**
   * Validates required fields for creating a community.
   *
   * @param req - The incoming request object containing the community creation data
   * @returns {boolean} - True if all required fields are present, false otherwise
   */
  const isCreateCommunityRequestValid = (req: CreateCommunityRequest): boolean => {
    const { name, description, admin } = req.body;
    return !!name && !!description && !!admin;
  };

  /**
   * Validates required fields for toggling membership.
   *
   * @param req - The request object containing membership toggle information
   * @returns {boolean} - True if all required fields are present, false otherwise
   */
  const isToggleMembershipRequestValid = (req: ToggleMembershipRequest): boolean => {
    const { communityId, username } = req.body;
    return !!communityId && !!username;
  };

  /**
<<<<<<< HEAD
   * 
=======
   *
>>>>>>> 0f95291 (IP1 edits)
   * Validates required fields for deleting a community.
   *
   * @param req - The request object containing community deletion information
   * @returns {boolean} - True if all required fields are present, false otherwise
   */
  const isDeleteCommunityRequestValid = (req: DeleteCommunityRequest): boolean => {
    return (
      !!req.params &&
      !!req.params.communityId &&
      !!req.body &&
      typeof req.body.username === 'string' &&
      req.body.username.trim() !== ''
    );
  };

  /**
   * Task 2.5.1 - 1.5 Points
   * Write a route handler for retrieving a community by its ID.
   *
   * @param req - The request object containing the communityId parameter
   * @param res - The response object used to send back the result
   * @returns {Promise<void>} - A promise that resolves when the response has been sent
   */
  const getCommunityRoute = async (req: CommunityIdRequest, res: Response): Promise<void> => {
    // - Write your code here -
<<<<<<< HEAD
=======
    try {
      const { communityId } = req.params;
      if (!communityId) {
        res.status(400).send('Invalid get community request');
        return;
      }

      const result = await getCommunity(communityId);
      if ('error' in result) {
        res.status(500).send(result.error);
        return;
      }
      res.status(200).json(result);
    } catch (err: unknown) {
      res.status(500).send(`Error when getting community: ${(err as Error).message}`);
    }
>>>>>>> 0f95291 (IP1 edits)
  };

  /**
   * Task 2.5.2 - 1.5 Points
   * Write a route handler for retrieving all communities.
   *
   * @param _req - The express request object (unused, hence the underscore prefix)
   * @param res - The response object used to send back the result
   * @returns {Promise<void>} - A promise that resolves when the response has been sent
   */
  const getAllCommunitiesRoute = async (_req: express.Request, res: Response): Promise<void> => {
    // - Write your code here -
<<<<<<< HEAD
=======
    try {
      const result = await getAllCommunities();
      if ('error' in (result as { error?: string })) {
        res.status(500).send((result as { error: string }).error);
        return;
      }
      res.status(200).json(result);
    } catch (err: unknown) {
      res.status(500).send(`Error when getting all communities: ${(err as Error).message}`);
    }
>>>>>>> 0f95291 (IP1 edits)
  };

  /**
   * Task 2.5.3 - 1.5 Points
   * Write a route handler for toggling a user's membership status in a community.
   * Make correct use of error handling, validation checks and status codes, related to user permissions.
   *
   * @param req - The request object containing communityId and username
   * @param res - The response object used to send back the result
   * @returns {Promise<void>} - A promise that resolves when the response has been sent
   */
  const toggleMembershipRoute = async (
    req: ToggleMembershipRequest,
    res: Response,
  ): Promise<void> => {
<<<<<<< HEAD

    // - Write your code here -

    try {

      // - Write your code here -

    } catch (err: unknown) {
      // - Write your code here -
=======
    // - Write your code here -
    try {
      if (!isToggleMembershipRequestValid(req)) {
        res.status(400).send('Invalid toggle membership body');
        return;
      }

      const { communityId, username } = req.body;
      const result = await toggleCommunityMembership(communityId, username);

      if ('error' in result) {
        const msg = result.error.toLowerCase();
        if (msg.includes('admin')) {
          res.status(403).send(result.error);
          return;
        }
        if (msg.includes('not found')) {
          res.status(404).send(result.error);
          return;
        }
        res.status(500).send(result.error);
        return;
      }

      // optional broadcast (non-breaking if ignored by tests)
      socket.emit('communityUpdate', { type: 'updated', community: result });

      res.status(200).json(result);
    } catch (err: unknown) {
      res.status(500).send(`Error when toggling community membership: ${(err as Error).message}`);
>>>>>>> 0f95291 (IP1 edits)
    }
  };

  /**
   * Task 2.5.4 - 1.5 Points
   * Create a function to handle community creation requests.
   *
   * @param req - The request object containing community details (name, description, admin, etc.)
   * @param res - The response object used to send back the result
   * @returns {Promise<void>} - A promise that resolves when the response has been sent
   */
  const createCommunityRoute = async (
    req: CreateCommunityRequest,
    res: Response,
  ): Promise<void> => {
    // - Write your code here -
<<<<<<< HEAD
=======
    try {
      if (!isCreateCommunityRequestValid(req)) {
        res.status(400).send('Invalid community body');
        return;
      }

      const { name, description, admin, visibility, participants } = req.body;
      const result = await createCommunity({
        name,
        description,
        admin,
        visibility,
        participants: participants ?? [],
      } as unknown as Parameters<typeof createCommunity>[0]);

      if ('error' in result) {
        res.status(500).send(result.error);
        return;
      }
      socket.emit('communityUpdate', { type: 'created', community: result });

      res.status(200).json(result);
    } catch (err: unknown) {
      res.status(500).send(`Error when creating community: ${(err as Error).message}`);
    }
>>>>>>> 0f95291 (IP1 edits)
  };

  /**
   * Task 2.5.5 - 1.5 Points
   * Create a function to handle community deletion requests.
   * Use appropriate validation and error handling.
   *
   * @param req - The request object containing communityId and username
   * @param res - The response object used to send back the result
   * @returns {Promise<void>} - A promise that resolves when the response has been sent
   */
  const deleteCommunityRoute = async (
    req: DeleteCommunityRequest,
    res: Response,
  ): Promise<void> => {
    // - Write your code here -
<<<<<<< HEAD
=======
    try {
      if (!isDeleteCommunityRequestValid(req)) {
        res.status(400).send('Invalid delete request body');
        return;
      }

      const { communityId } = req.params;
      const { username } = req.body;

      const result = await deleteCommunity(communityId, username);

      if ('error' in result) {
        const msg = result.error.toLowerCase();
        if (msg.includes('not admin')) {
          res.status(403).send(result.error);
          return;
        }
        if (msg.includes('not found')) {
          res.status(404).send(result.error);
          return;
        }
        res.status(500).send(result.error);
        return;
      }

      socket.emit('communityUpdate', { type: 'deleted', community: result });

      res.status(200).json(result);
    } catch (err: unknown) {
      res.status(500).send(`Error when deleting community: ${(err as Error).message}`);
    }
>>>>>>> 0f95291 (IP1 edits)
  };

  /**
   * Task 2.6 - 2.5 Points
   * Write Route Handlers for Community Operations
   * Make sure to use appropriate HTTP status codes and error handling.
   */

  // - Write your code here -
<<<<<<< HEAD

=======
  router.get('/getCommunity/:communityId', getCommunityRoute);
  router.get('/getAllCommunities', getAllCommunitiesRoute);
  router.post('/toggleMembership', toggleMembershipRoute);
  router.post('/create', createCommunityRoute);
  router.delete('/delete/:communityId', deleteCommunityRoute);
>>>>>>> 0f95291 (IP1 edits)

  return router;
};

<<<<<<< HEAD
export default communityController;
=======
export default communityController;
>>>>>>> 0f95291 (IP1 edits)
