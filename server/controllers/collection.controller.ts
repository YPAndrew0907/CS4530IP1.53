import express, { Response } from 'express';
import {
  CreateCollectionRequest,
  SaveQuestionRequest,
  GetCollectionsByUserIdRequest,
  CollectionRequest,
  FakeSOSocket,
  PopulatedDatabaseCollection,
} from '../types/types';
import {
  createCollection,
  deleteCollection,
  getCollectionsByUsername,
  getCollectionById,
  addQuestionToCollection as toggleSaveQuestionToCollection,
} from '../services/collection.service';
import { populateDocument } from '../utils/database.util';

/*
 * The collectionController sets up routes for collection-related API endpoints.
 * It validates inputs, calls into the service layer, and emits socket events when
 * collections are created, updated, or deleted. On error, it returns appropriate
 * status codes and messages.
 */
const collectionController = (socket: FakeSOSocket) => {
  const router = express.Router();

  // Validate that a create collection request has required fields
  const isCreateValid = (req: CreateCollectionRequest): boolean =>
    !!req.body.name && !!req.body.username;

  // POST /create
  const createCollectionRoute = async (
    req: CreateCollectionRequest,
    res: Response,
  ): Promise<void> => {
    if (!isCreateValid(req)) {
      res.status(400).send('Invalid collection body');
      return;
    }
    try {
      const { name, description, questions, username, isPrivate } = req.body;
      const created = await createCollection({
        name,
        description,
        questions,
        username,
        isPrivate,
      });
      if ('error' in created) {
        throw new Error(created.error as string);
      }
      const populated = await populateDocument(
        (created as any)._id.toString(),
        'collection',
      );
      if ('error' in populated) {
        throw new Error((populated as any).error as string);
      }
      socket.emit('collectionUpdate', {
        type: 'created',
        collection: populated as PopulatedDatabaseCollection,
      });
      res.status(200).json(populated);
    } catch (err) {
      res
        .status(500)
        .send(`Error when creating collection: ${(err as Error).message}`);
    }
  };

  // DELETE /delete/:collectionId
  const deleteCollectionRoute = async (
    req: CollectionRequest,
    res: Response,
  ): Promise<void> => {
    const { collectionId } = req.params;
    const { username } = req.query;
    if (!collectionId || !username) {
      res.status(400).send('Invalid collection body');
      return;
    }
    try {
      const deleted = await deleteCollection(
        collectionId,
        String(username),
      );
      if ('error' in deleted) {
        throw new Error(deleted.error as string);
      }
      const populated = await populateDocument(
        (deleted as any)._id.toString(),
        'collection',
      );
      if ('error' in populated) {
        throw new Error((populated as any).error as string);
      }
      socket.emit('collectionUpdate', {
        type: 'deleted',
        collection: populated as PopulatedDatabaseCollection,
      });
      res.status(200).json(populated);
    } catch (err) {
      res
        .status(500)
        .send(`Error when deleting collection: ${(err as Error).message}`);
    }
  };

  // PATCH /toggleSaveQuestion
  const toggleSaveQuestionRoute = async (
    req: SaveQuestionRequest,
    res: Response,
  ): Promise<void> => {
    const { collectionId, questionId, username } = req.body;
    if (
      typeof collectionId !== 'string' ||
      typeof questionId !== 'string' ||
      typeof username !== 'string'
    ) {
      res.status(400).send('Invalid toggle request');
      return;
    }
    try {
      const updated = await toggleSaveQuestionToCollection(
        collectionId,
        questionId,
        username,
      );
      if ('error' in updated) {
        throw new Error(updated.error as string);
      }
      const populated = await populateDocument(
        (updated as any)._id.toString(),
        'collection',
      );
      if ('error' in populated) {
        throw new Error((populated as any).error as string);
      }
      socket.emit('collectionUpdate', {
        type: 'updated',
        collection: populated as PopulatedDatabaseCollection,
      });
      res.status(200).json(populated);
    } catch (err) {
      res
        .status(500)
        .send(`Error when toggling save question: ${(err as Error).message}`);
    }
  };

  // GET /getCollectionsByUsername/:username
  const getCollectionsByUsernameRoute = async (
    req: GetCollectionsByUserIdRequest,
    res: Response,
  ): Promise<void> => {
    const { username } = req.params;
    const { currentUsername } = req.query;
    if (!username || !currentUsername) {
      res.status(400).send('Invalid collection body');
      return;
    }
    try {
      const list = await getCollectionsByUsername(
        username,
        String(currentUsername),
      );
      if ('error' in list) {
        throw new Error(list.error as string);
      }
      res.status(200).json(list);
    } catch (err) {
      res
        .status(500)
        .send(`Error when getting collections: ${(err as Error).message}`);
    }
  };

  // GET /getCollectionById/:collectionId
  const getCollectionByIdRoute = async (
    req: CollectionRequest,
    res: Response,
  ): Promise<void> => {
    const { collectionId } = req.params;
    const { username } = req.query;
    if (!collectionId || !username) {
      res.status(400).send('Invalid collection body');
      return;
    }
    try {
      const collection = await getCollectionById(
        collectionId,
        String(username),
      );
      if ('error' in collection) {
        throw new Error(collection.error as string);
      }
      res.status(200).json(collection);
    } catch (err) {
      res
        .status(500)
        .send(`Error when getting collection by id: ${(err as Error).message}`);
    }
  };

  router.post('/create', createCollectionRoute);
  router.delete('/delete/:collectionId', deleteCollectionRoute);
  router.patch('/toggleSaveQuestion', toggleSaveQuestionRoute);
  router.get(
    '/getCollectionsByUsername/:username',
    getCollectionsByUsernameRoute,
  );
  router.get(
    '/getCollectionById/:collectionId',
    getCollectionByIdRoute,
  );

  return router;
};

export default collectionController;
