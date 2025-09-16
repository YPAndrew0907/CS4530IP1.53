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

<<<<<<< HEAD
=======
/**
 * Provides all collection routes.
 */
>>>>>>> 0f95291 (IP1 edits)
const collectionController = (socket: FakeSOSocket) => {
  const router = express.Router();

  /**
   * Checks if the provided answer request contains the required fields.
   *
   * @param req The request object containing the answer data.
   *
   * @returns `true` if the request is valid, otherwise `false`.
   */
  const isRequestValid = (req: CreateCollectionRequest): boolean =>
    !!req.body.name && !!req.body.description && !!req.body.questions && !!req.body.username;

  const isCollectionRequestValid = (req: CollectionRequest): boolean =>
    !!req.params.collectionId && !!req.query.username;

  /**
   * Task 1.5.1 - 1.5 Points
   * Create an endpoint function for adding new collection in the database.
   * Make correct use of error handeling, validation checks and status codes.
   * Make sure to use socket logic and mongoose functions accurately.
   * @param req The request object containing the collection data.
   * @param res The response object.
   * @returns `void`.
   */
  const createCollectionRoute = async (
    req: CreateCollectionRequest,
    res: Response,
  ): Promise<void> => {
<<<<<<< HEAD

    // - Write your code here -
=======
    // validate request per starter helper
    if (!isRequestValid(req)) {
      res.status(400).send('Invalid collection body');
      return;
    }
>>>>>>> 0f95291 (IP1 edits)

    try {
      const { name, description, questions, username, isPrivate } = req.body;
      const collection = await createCollection({
        name,
        description,
        questions,
        username,
        isPrivate,
      });

      if ('error' in collection) {
        throw new Error(collection.error as string);
      }

<<<<<<< HEAD
      // - Write your code here -

=======
      // populate for socket broadcast; return raw created doc
      const populated = await populateDocument(collection._id.toString(), 'collection');
      if ('error' in populated) {
        throw new Error(populated.error as string);
      }

      socket.emit('collectionUpdate', {
        type: 'created',
        collection: populated as PopulatedDatabaseCollection,
      });

      res.status(200).json(collection);
>>>>>>> 0f95291 (IP1 edits)
    } catch (err: unknown) {
      res.status(500).send(`Error when creating collection: ${(err as Error).message}`);
    }
  };

  /**
   * Task 1.5.2 - 1.5 Points
   * Endpoint for Deleting a collection from the database.
   * Make correct use of error handeling, validation checks and status codes.
   * Make sure to use socket logic and mongoose functions accurately.
   * @param req The request object containing the collection id.
   * @param res The response object.
   *
   * @returns `void`.
   */
  const deleteCollectionRoute = async (req: CollectionRequest, res: Response): Promise<void> => {
    try {
      if (!isCollectionRequestValid(req)) {
        res.status(400).send('Invalid collection body');
        return;
      }

<<<<<<< HEAD
      // - Write your code here -

    } catch (err: unknown) {

      // - Write your code here -
=======
      const { collectionId } = req.params;
      const { username } = req.query;

      // populate for broadcast prior to deletion (best‑effort)
      const populated = await populateDocument(collectionId, 'collection');

      const deleted = await deleteCollection(collectionId, username as string);
      if ('error' in deleted) {
        throw new Error(deleted.error as string);
      }

      if (!('error' in populated)) {
        socket.emit('collectionUpdate', {
          type: 'deleted',
          collection: populated as PopulatedDatabaseCollection,
        });
      }

      res.status(200).json(deleted);
    } catch (err: unknown) {
      res.status(500).send(`Error when deleting collection: ${(err as Error).message}`);
>>>>>>> 0f95291 (IP1 edits)
    }
  };

  /**
<<<<<<< HEAD
  * Task 1.5.3 - 1.5 Points
  * Endpoint function to add a question to a collection.
  * Make correct use of error handeling, validation checks and status codes.
  * Make sure to use socket logic and mongoose functions accurately.
=======
   * Task 1.5.3 - 1.5 Points
   * Endpoint function to add a question to a collection.
   * Make correct use of error handeling, validation checks and status codes.
   * Make sure to use socket logic and mongoose functions accurately.
>>>>>>> 0f95291 (IP1 edits)
   * @param req The request object containing the collection id and question id.
   * @param res The response object.
   *
   * @returns `void`.
<<<<<<< HEAD
  */
=======
   */
>>>>>>> 0f95291 (IP1 edits)
  const toggleSaveQuestionRoute = async (
    req: SaveQuestionRequest,
    res: Response,
  ): Promise<void> => {
<<<<<<< HEAD

    // - Write your code here -
=======
    if (
      !req.body ||
      typeof req.body.collectionId !== 'string' ||
      typeof req.body.questionId !== 'string' ||
      typeof req.body.username !== 'string'
    ) {
      res.status(400).send('Invalid toggle request');
      return;
    }
>>>>>>> 0f95291 (IP1 edits)

    try {
      const { collectionId, questionId, username } = req.body;

      const updatedCollection = await toggleSaveQuestionToCollection(
        collectionId,
        questionId,
        username,
      );

      if ('error' in updatedCollection) {
        throw new Error(updatedCollection.error as string);
      }

      const populatedCollection = await populateDocument(
        updatedCollection._id.toString(),
        'collection',
      );

      if ('error' in populatedCollection) {
        throw new Error(populatedCollection.error as string);
      }

<<<<<<< HEAD
      // - Write your code here -

    } catch (err: unknown) {

      // - Write your code here -

=======
      socket.emit('collectionUpdate', {
        type: 'updated',
        collection: populatedCollection as PopulatedDatabaseCollection,
      });

      res.status(200).json(updatedCollection);
    } catch (err: unknown) {
      res.status(500).send(`Error when toggling save question: ${(err as Error).message}`);
>>>>>>> 0f95291 (IP1 edits)
    }
  };

  /**
   * Task 1.5.4 - 1.5 Points
   * Endpoint function to get all collections for a user using their username.
   * Make correct use of error handeling, validation checks and status codes.
   * Make sure to use socket logic and mongoose functions accurately.
   * @param req The request object containing the usernames.
   * @param res The response object containing the collections.
   *
   * @returns `void`.
   */
  const getCollectionsByUsernameRoute = async (
    req: GetCollectionsByUserIdRequest,
    res: Response,
  ): Promise<void> => {
    if (!req.query.currentUsername) {
      res.status(400).send('Invalid collection body');
      return;
    }

<<<<<<< HEAD
    const { username: usernameToView } = req.params;
    const { currentUsername } = req.query;

    try {

      // - Write your code here -

=======
    try {
      const list = await getCollectionsByUsername(
        req.params.username,
        String(req.query.currentUsername),
      );

      if ('error' in list) {
        throw new Error(list.error as string);
      }

      res.status(200).json(list);
>>>>>>> 0f95291 (IP1 edits)
    } catch (err: unknown) {
      res.status(500).send(`Error when getting collections by username: ${(err as Error).message}`);
    }
  };

  /**
   * Task 1.5.5 - 1.5 Points
   * Endpoint function to get a collection by its ID.
   * Make correct use of error handeling, validation checks and status codes.
   * Make sure to use socket logic and mongoose functions accurately.
   * @param req The request object containing the collection id.
   * @param res The response object.
   *
   * @returns `void`.
   */
  const getCollectionByIdRoute = async (req: CollectionRequest, res: Response): Promise<void> => {
<<<<<<< HEAD
    // -Write your code here -
  };


  /*
  * Task 1.6 - 2.5 Points
  * Define the routes for the collection controller functions.
  * Use `router` to define the routes.
  * Make sure to use appropriate HTTP methods (GET, POST, DELETE, PATCH).
  */
=======
    const { collectionId } = req.params;
    const { username } = req.query;

    if (!collectionId || !username) {
      res.status(400).send('Invalid collection body');
      return;
    }

    try {
      const coll = await getCollectionById(collectionId, username as string);

      if ('error' in coll) {
        throw new Error(coll.error as string);
      }

      res.status(200).json(coll);
    } catch (err: unknown) {
      res.status(500).send(`Error when getting collection by id: ${(err as Error).message}`);
    }
  };

  /*
   * Task 1.6 - 2.5 Points
   * Define the routes for the collection controller functions.
   * Use `router` to define the routes.
   * Make sure to use appropriate HTTP methods (GET, POST, DELETE, PATCH).
   */
  router.post('/create', createCollectionRoute);
  router.delete('/delete/:collectionId', deleteCollectionRoute);
  router.patch('/toggleSaveQuestion', toggleSaveQuestionRoute);
  router.get('/getCollectionsByUsername/:username', getCollectionsByUsernameRoute);
  router.get('/getCollectionById/:collectionId', getCollectionByIdRoute);
>>>>>>> 0f95291 (IP1 edits)

  return router;
};

<<<<<<< HEAD
export default collectionController;
=======
export default collectionController;
>>>>>>> 0f95291 (IP1 edits)
