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
 * Controller for community-related routes.
 * Defines route handlers that interface with the community service and emit socket events.
 * Each handler validates inputs, invokes the service functions and returns appropriate HTTP
 * status codes based on success or error.
 */
const communityController = (socket: FakeSOSocket) => {
  const router = express.Router();

  // Validate request body for community creation
  const isCreateCommunityRequestValid = (req: CreateCommunityRequest): boolean => {
    const { name, description, admin } = req.body;
    return !!name && !!description && !!admin;
  };

  // Validate request body for membership toggle
  const isToggleMembershipRequestValid = (req: ToggleMembershipRequest): boolean => {
    const { communityId, username } = req.body;
    return !!communityId && !!username;
  };

  // Validate request parameters/body for community deletion
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
   * Route handler for retrieving a community by its ID.
   */
  const getCommunityRoute = async (req: CommunityIdRequest, res: Response): Promise<void> => {
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
  };

  /**
   * Route handler for retrieving all communities.
   */
  const getAllCommunitiesRoute = async (
    _req: express.Request,
    res: Response,
  ): Promise<void> => {
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
  };

  /**
   * Route handler for toggling a user's membership status in a community.
   */
  const toggleMembershipRoute = async (
    req: ToggleMembershipRequest,
    res: Response,
  ): Promise<void> => {
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

      // emit update event
      socket.emit('communityUpdate', { type: 'updated', community: result });

      res.status(200).json(result);
    } catch (err: unknown) {
      res
        .status(500)
        .send(`Error when toggling community membership: ${(err as Error).message}`);
    }
  };

  /**
   * Route handler for creating a community.
   */
  const createCommunityRoute = async (
    req: CreateCommunityRequest,
    res: Response,
  ): Promise<void> => {
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
  };

  /**
   * Route handler for deleting a community.
   */
  const deleteCommunityRoute = async (
    req: DeleteCommunityRequest,
    res: Response,
  ): Promise<void> => {
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
  };

  // Register routes
  router.get('/getCommunity/:communityId', getCommunityRoute);
  router.get('/getAllCommunities', getAllCommunitiesRoute);
  router.post('/toggleMembership', toggleMembershipRoute);
  router.post('/create', createCommunityRoute);
  router.delete('/delete/:communityId', deleteCommunityRoute);

  return router;
};

export default communityController;
