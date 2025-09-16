import { ObjectId } from 'mongodb';
import CollectionModel from '../models/collection.model';
import { Collection, CollectionResponse, DatabaseCollection } from '../types/types';

/**
 * Task 1.4.1 - 4 points
 * Create a new collection in the database.
 * Make correct use of error handeling, and mongoose functions.
 * @param collection - The collection data to create
 * @returns A Promise resolving to the created collection or an error object
 */
export const createCollection = async (collection: Collection): Promise<CollectionResponse> => {
<<<<<<< HEAD
  // - Write your code here -

  return { error: 'Not implemented' };

=======
  try {
    if (!collection || !collection.name || !collection.username) {
      throw new Error('Invalid collection body');
    }
    const name = collection.name.trim();
    const username = collection.username.trim();
    const isPrivate = collection.isPrivate ?? true;

    if (!name || !username) {
      throw new Error('Invalid collection body');
    }

    const existing = await CollectionModel.findOne({ name, username });
    if (existing) {
      return { error: 'Collection already exists' };
    }

    const items: unknown[] = Array.isArray(collection.questions) ? collection.questions : [];

    type WithId = { _id: unknown };
    const toId = (v: unknown): ObjectId => {
      if (v instanceof ObjectId) return v;
      if (typeof v === 'string') return new ObjectId(v);
      if (typeof v === 'object' && v !== null && '_id' in (v as Record<string, unknown>)) {
        const raw = (v as WithId)._id;
        if (raw instanceof ObjectId) return raw;
        if (typeof raw === 'string') return new ObjectId(raw);
      }
      throw new Error('Invalid question id');
    };

    const created = await CollectionModel.create({
      name,
      description: collection.description ?? '',
      questions: items.map(toId),
      username,
      isPrivate,
    });

    if (!created) {
      throw new Error('Failed to create collection');
    }
    return created as DatabaseCollection;
  } catch (err) {
    return { error: `Error when creating collection: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 1.4.2 - 4 points
<<<<<<< HEAD
 * Delete a collection from the database.
 * Make correct use of error handeling, and mongoose functions.
 * @param id - The ID of the collection to delete
 * @param username - The username of the user requesting deletion
 * @returns A Promise resolving to a success object or an error object
=======
 * Delete a collection by its ID and username
 * @param id - The ID of the collection to delete
 * @param username - The username of the requesting user
 * @returns A Promise resolving to the deleted collection or an error object
>>>>>>> 0f95291 (IP1 edits)
 */
export const deleteCollection = async (
  id: string,
  username: string,
): Promise<CollectionResponse> => {
<<<<<<< HEAD
  // - Write your code here -

  return { error: 'Not implemented' };
=======
  try {
    if (!id || !username) {
      throw new Error('Invalid delete request');
    }
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid collection id');
    }

    const deleted = await CollectionModel.findOneAndDelete({
      _id: new ObjectId(id),
      username,
    });

    if (!deleted) {
      return { error: 'Collection not found' };
    }

    return deleted as DatabaseCollection;
  } catch (err) {
    return { error: `Error when deleting collection: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 1.4.3 - 4 points
 * Get all the collections for a user using their username.
 * @param usernameToView - The username of the user whose collections to view
 * @param currentUsername - The username of the user requesting the view
 * @returns A Promise resolving to an array of collections or an error object
 */
export const getCollectionsByUsername = async (
  usernameToView: string,
  currentUsername: string,
): Promise<DatabaseCollection[] | { error: string }> => {
<<<<<<< HEAD
  // - Write your code here -
  // Delete private collections if the user is not the owner
  // - Write your code here -

  return { error: 'Not implemented' };
=======
  try {
    if (!usernameToView || !currentUsername) {
      throw new Error('Invalid get by username request');
    }

    const isOwner = usernameToView.trim() === currentUsername.trim();
    const filter: Record<string, unknown> = { username: usernameToView };
    if (!isOwner) {
      filter.isPrivate = false;
    }

    const collections = await CollectionModel.find(filter);
    return (collections ?? []) as DatabaseCollection[];
  } catch (err) {
    return {
      error: `Error when getting collections by username: ${(err as Error).message}`,
    };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 1.4.4 - 4 points
<<<<<<< HEAD
 * Get a collection by id.
 * @param id - The ID of the collection to retrieve
 * @param username - The username of the user requesting the collection
=======
 * Get a collection by its ID. If the collection is private, only the owner can access it.
 * @param id - The ID of the collection
 * @param username - The username of the requesting user
>>>>>>> 0f95291 (IP1 edits)
 * @returns A Promise resolving to the collection or an error object
 */
export const getCollectionById = async (
  id: string,
  username: string,
): Promise<CollectionResponse> => {
<<<<<<< HEAD
  // - Write your code here -

  return { error: 'Not implemented' };
=======
  try {
    if (!id || !username) {
      throw new Error('Invalid get by id request');
    }
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid collection id');
    }

    const found = await CollectionModel.findById(new ObjectId(id));
    if (!found) {
      return { error: 'Collection not found' };
    }
    if (found.isPrivate && found.username !== username) {
      return { error: 'Unauthorized access to private collection' };
    }

    return found as DatabaseCollection;
  } catch (err) {
    return { error: `Error when getting collection by id: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 1.4.5 - 4 points
<<<<<<< HEAD
 * Add a question to a collection if it is not already present 
=======
 * Add a question to a collection if it is not already present
>>>>>>> 0f95291 (IP1 edits)
 * else remove it from the collection.
 * @param collectionId - The ID of the collection to update
 * @param questionId - The ID of the question to add or remove
 * @param username - The username of the user requesting the update
 */
export const addQuestionToCollection = async (
  collectionId: string,
  questionId: string,
  username: string,
): Promise<CollectionResponse> => {
<<<<<<< HEAD
  // - Write your code here -

  return { error: 'Not implemented' };
};
=======
  try {
    if (!collectionId || !questionId || !username) {
      throw new Error('Invalid toggle request');
    }
    if (!ObjectId.isValid(collectionId) || !ObjectId.isValid(questionId)) {
      throw new Error('Invalid id provided');
    }

    const collection = await CollectionModel.findById(new ObjectId(collectionId));
    if (!collection) {
      return { error: 'Collection not found' };
    }
    if (collection.username !== username) {
      return { error: 'User does not own collection' };
    }

    const qid = new ObjectId(questionId);
    const hasQuestion = (collection.questions as unknown[]).some(q => String(q) === qid.toString());

    const update = hasQuestion ? { $pull: { questions: qid } } : { $addToSet: { questions: qid } };

    const updated = await CollectionModel.findOneAndUpdate(
      { _id: new ObjectId(collectionId), username },
      update,
      { new: true },
    );

    if (!updated) {
      return { error: 'Failed to update collection' };
    }

    return updated as DatabaseCollection;
  } catch (err) {
    return { error: `Error when updating collection: ${(err as Error).message}` };
  }
};
>>>>>>> 0f95291 (IP1 edits)
