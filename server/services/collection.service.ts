import { ObjectId } from 'mongodb';
import CollectionModel from '../models/collection.model';
import {
  Collection,
  CollectionResponse,
  DatabaseCollection,
} from '../types/types';

/**
 * Create a new collection in the database.
 * Validates input, checks for duplicates, converts question IDs to ObjectIds,
 * and saves the collection.
 */
export const createCollection = async (
  collection: Collection,
): Promise<CollectionResponse> => {
  try {
    if (!collection || !collection.name || !collection.username) {
      throw new Error('Invalid collection body');
    }
    const name = collection.name.trim();
    const username = collection.username.trim();
    const description = collection.description?.trim() ?? '';
    const isPrivate = collection.isPrivate ?? true;
    if (!name || !username) {
      throw new Error('Invalid collection body');
    }
    // Check for duplicate collection name for the user
    const existing = await CollectionModel.findOne({ name, username });
    if (existing) {
      return { error: 'Collection already exists' };
    }
    // Convert question IDs to ObjectId
    const items = collection.questions ?? [];
    const toObjectId = (v: any): ObjectId => {
      if (v instanceof ObjectId) {
        return v;
      }
      if (typeof v === 'string' && v) {
        return new ObjectId(v);
      }
      if (v && typeof v === 'object' && v._id) {
        const raw = v._id;
        if (raw instanceof ObjectId) return raw;
        if (typeof raw === 'string' && raw) return new ObjectId(raw);
      }
      throw new Error('Invalid question id');
    };
    const created = await CollectionModel.create({
      name,
      description,
      username,
      questions: items.map(toObjectId),
      isPrivate,
    });
    if (!created) {
      throw new Error('Failed to create collection');
    }
    return created as DatabaseCollection;
  } catch (err) {
    return { error: `Error when creating collection: ${(err as Error).message}` };
  }
};

/**
 * Delete a collection by its ID and the owner username.
 */
export const deleteCollection = async (
  id: string,
  username: string,
): Promise<CollectionResponse> => {
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
};

/**
 * Get all collections for a user. Private collections are hidden unless
 * the current user is the owner.
 */
export const getCollectionsByUsername = async (
  usernameToView: string,
  currentUsername: string,
): Promise<DatabaseCollection[] | { error: string }> => {
  try {
    if (!usernameToView || !currentUsername) {
      throw new Error('Invalid get by username request');
    }
    const isOwner = usernameToView.trim() === currentUsername.trim();
    const filter: any = { username: usernameToView.trim() };
    if (!isOwner) {
      filter.isPrivate = false;
    }
    const collections = await CollectionModel.find(filter);
    return (collections ?? []) as DatabaseCollection[];
  } catch (err) {
    return { error: `Error when getting collections by username: ${(err as Error).message}` };
  }
};

/**
 * Get a single collection by ID. Private collections can only be accessed
 * by their owner.
 */
export const getCollectionById = async (
  id: string,
  username: string,
): Promise<CollectionResponse> => {
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
};

/**
 * Add a question to a collection if it is not already present; otherwise
 * remove it from the collection. Only the owner can modify their collection.
 */
export const addQuestionToCollection = async (
  collectionId: string,
  questionId: string,
  username: string,
): Promise<CollectionResponse> => {
  try {
    if (!collectionId || !questionId || !username) {
      throw new Error('Invalid toggle request');
    }
    if (!ObjectId.isValid(collectionId) || !ObjectId.isValid(questionId)) {
      throw new Error('Invalid ids');
    }
    const collection = await CollectionModel.findOne({
      _id: new ObjectId(collectionId),
      username,
    });
    if (!collection) {
      return { error: 'Collection not found' };
    }
    const qid = new ObjectId(questionId);
    const hasQuestion = collection.questions.some((q: any) => {
      if (q instanceof ObjectId) return q.equals(qid);
      if (typeof q === 'string') return q === questionId;
      if (q && q._id) {
        const raw = q._id;
        if (raw instanceof ObjectId) return raw.equals(qid);
        if (typeof raw === 'string') return raw === questionId;
      }
      return false;
    });
    let updated;
    if (hasQuestion) {
      updated = await CollectionModel.findOneAndUpdate(
        { _id: collection._id, username },
        { $pull: { questions: qid } },
        { new: true },
      );
    } else {
      updated = await CollectionModel.findOneAndUpdate(
        { _id: collection._id, username },
        { $addToSet: { questions: qid } },
        { new: true },
      );
    }
    if (!updated) {
      throw new Error('Failed to update collection');
    }
    return updated as DatabaseCollection;
  } catch (err) {
    return { error: `Error when toggling question: ${(err as Error).message}` };
  }
};
