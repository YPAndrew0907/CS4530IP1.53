<<<<<<< HEAD
=======
// server/tests/services/collection.service.spec.ts
>>>>>>> 0f95291 (IP1 edits)
import mongoose from 'mongoose';
import CollectionModel from '../../models/collection.model';
import {
  createCollection,
  deleteCollection,
  getCollectionsByUsername,
  getCollectionById,
  addQuestionToCollection,
} from '../../services/collection.service';
import { Collection, DatabaseCollection } from '../../types/types';
<<<<<<< HEAD
import assert from 'assert';
=======
>>>>>>> 0f95291 (IP1 edits)

describe('Collection Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock question IDs for testing
  const mockQuestionId1 = new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6aa');

  const mockCollection: DatabaseCollection = {
    _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6dd'),
    name: 'Test Collection',
    description: 'Test Description',
    username: 'test_user',
    questions: [mockQuestionId1],
    isPrivate: false,
  };

  const mockCollectionInput: Collection = {
    name: 'New Collection',
    description: 'New Description',
    username: 'new_user',
    questions: [],
    isPrivate: true,
  };

  describe('createCollection', () => {
    test('should create a new collection successfully', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return error when creation fails', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      const createdSpy = jest
        .spyOn(CollectionModel, 'create')
        .mockResolvedValue(mockCollection as never);

      const result = await createCollection(mockCollectionInput);

      expect(createdSpy).toHaveBeenCalledTimes(1);
      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection)._id.toString()).toBe(mockCollection._id.toString());
    });

    test('should return error when creation fails', async () => {
      jest.spyOn(CollectionModel, 'create').mockResolvedValue(null as never);

      const result = await createCollection(mockCollectionInput);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Failed to create collection');
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CollectionModel, 'create').mockRejectedValue(new Error('DB down'));

      const result = await createCollection(mockCollectionInput);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Error when creating collection');
      expect((result as { error: string }).error).toContain('DB down');
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('deleteCollection', () => {
    test('should delete collection when it exists and belongs to user', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should throw error when collection not found', async () => {
      assert(false);
    });

    test('should throw error when deletion fails', async () => {
      assert(false);
    });

    test('should not delete collection belonging to another user', async () => {
      assert(false);
=======
      const findOne = jest
        .spyOn(CollectionModel, 'findOne')
        .mockResolvedValue(mockCollection as never);
      const findByIdAndDelete = jest
        .spyOn(CollectionModel, 'findByIdAndDelete')
        .mockResolvedValue(mockCollection as never);

      const result = await deleteCollection(mockCollection._id.toString(), mockCollection.username);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection)._id.toString()).toBe(mockCollection._id.toString());
    });

    test('should throw error when collection not found', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(null as never);

      const result = await deleteCollection(mockCollection._id.toString(), mockCollection.username);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Collection not found');
    });

    test('should throw error when deletion fails', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(mockCollection as never);
      jest.spyOn(CollectionModel, 'findByIdAndDelete').mockResolvedValue(null as never);

      const result = await deleteCollection(mockCollection._id.toString(), mockCollection.username);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Failed to delete');
    });

    test('should not delete collection belonging to another user', async () => {
      const findOne = jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(null as never);
      const findByIdAndDelete = jest.spyOn(CollectionModel, 'findByIdAndDelete');

      const result = await deleteCollection(mockCollection._id.toString(), 'another_user');

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findByIdAndDelete).not.toHaveBeenCalled();
      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Collection not found');
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('getCollectionsByUsername', () => {
    test('should return all collections for owner', async () => {
<<<<<<< HEAD
      // Owner can see both public and private collections
      assert(false);
    });

    test('should filter out private collections for non-owner', async () => {
      // Non-owner should only see public collections
      assert(false);
    });

    test('should return empty array when no collections found', async () => {
      assert(false);
    });

    test('should return error when find returns null', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      const owner = 'owner_user';
      const docs: DatabaseCollection[] = [
        {
          ...mockCollection,
          _id: new mongoose.Types.ObjectId(),
          username: owner,
          isPrivate: false,
        },
        { ...mockCollection, _id: new mongoose.Types.ObjectId(), username: owner, isPrivate: true },
      ] as unknown as DatabaseCollection[];

      jest.spyOn(CollectionModel, 'find').mockResolvedValue(docs as never);

      const result = await getCollectionsByUsername(owner, owner);

      expect(Array.isArray(result)).toBe(true);
      expect(result as DatabaseCollection[]).toHaveLength(2);
    });

    test('should filter out private collections for non-owner', async () => {
      const owner = 'owner_user';
      const nonOwner = 'different_user';
      const docs: DatabaseCollection[] = [
        {
          ...mockCollection,
          _id: new mongoose.Types.ObjectId(),
          username: owner,
          isPrivate: false,
        },
        { ...mockCollection, _id: new mongoose.Types.ObjectId(), username: owner, isPrivate: true },
      ] as unknown as DatabaseCollection[];

      jest.spyOn(CollectionModel, 'find').mockResolvedValue(docs as never);

      const result = await getCollectionsByUsername(owner, nonOwner);

      expect(Array.isArray(result)).toBe(true);
      const list = result as DatabaseCollection[];
      expect(list).toHaveLength(1);
      expect(list[0].isPrivate).toBe(false);
    });

    test('should return empty array when no collections found', async () => {
      jest.spyOn(CollectionModel, 'find').mockResolvedValue([] as never);

      const result = await getCollectionsByUsername('userA', 'userA');

      expect(Array.isArray(result)).toBe(true);
      expect(result as DatabaseCollection[]).toHaveLength(0);
    });

    test('should return error when find returns null', async () => {
      jest.spyOn(CollectionModel, 'find').mockResolvedValue(null as never);

      const result = await getCollectionsByUsername('userA', 'userA');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CollectionModel, 'find').mockRejectedValue(new Error('DB exploded'));

      const result = await getCollectionsByUsername('userA', 'userA');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Error when getting collections');
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('getCollectionById', () => {
    test('should return collection when it is public', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return collection when user is owner and collection is private', async () => {
      assert(false);
    });

    test('should return error when collection is private and user is not owner', async () => {
      assert(false);
    });

    test('should return error when collection not found', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      const publicDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        isPrivate: false,
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(publicDoc as never);

      const result = await getCollectionById(publicDoc._id.toString(), 'any_user');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection)._id.toString()).toBe(publicDoc._id.toString());
    });

    test('should return collection when user is owner and collection is private', async () => {
      const owner = 'owner_user';
      const privateDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        username: owner,
        isPrivate: true,
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(privateDoc as never);

      const result = await getCollectionById(privateDoc._id.toString(), owner);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection).isPrivate).toBe(true);
    });

    test('should return error when collection is private and user is not owner', async () => {
      const privateDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        username: 'owner_user',
        isPrivate: true,
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(privateDoc as never);

      const result = await getCollectionById(privateDoc._id.toString(), 'not_owner');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error.toLowerCase()).toContain('private');
    });

    test('should return error when collection not found', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(null as never);

      const result = await getCollectionById(new mongoose.Types.ObjectId().toString(), 'someone');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error.toLowerCase()).toContain('not found');
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockRejectedValue(new Error('DB error'));

      const result = await getCollectionById(new mongoose.Types.ObjectId().toString(), 'user');

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('addQuestionToCollection', () => {
    test('should add question when it is not in collection', async () => {
<<<<<<< HEAD
      // Collection starts with empty questions array
      assert(false);
    });

    test('should remove question when it is already in collection', async () => {
      // Mock includes() to return true for existing question
      assert(false);
    });

    test('should return error when collection not found', async () => {
      assert(false);
    });

    test('should return error when user does not own collection', async () => {
      assert(false);
    });

    test('should return error when update fails', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      const qid = mockQuestionId1.toString();
      const baseDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        questions: [],
      } as unknown as DatabaseCollection;

      const updatedDoc: DatabaseCollection = {
        ...baseDoc,
        questions: [mockQuestionId1],
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(baseDoc as never);
      jest.spyOn(CollectionModel, 'findOneAndUpdate').mockResolvedValue(updatedDoc as never);

      const result = await addQuestionToCollection(baseDoc._id.toString(), qid, baseDoc.username);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection).questions.map(x => x.toString())).toContain(qid);
    });

    test('should remove question when it is already in collection', async () => {
      const qid = mockQuestionId1.toString();
      const baseDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        questions: [mockQuestionId1],
      } as unknown as DatabaseCollection;

      const updatedDoc: DatabaseCollection = {
        ...baseDoc,
        questions: [],
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(baseDoc as never);
      jest.spyOn(CollectionModel, 'findOneAndUpdate').mockResolvedValue(updatedDoc as never);

      const result = await addQuestionToCollection(baseDoc._id.toString(), qid, baseDoc.username);

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCollection).questions).toHaveLength(0);
    });

    test('should return error when collection not found', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(null as never);

      const result = await addQuestionToCollection(
        new mongoose.Types.ObjectId().toString(),
        mockQuestionId1.toString(),
        'userA',
      );

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error.toLowerCase()).toContain('not found');
    });

    test('should return error when user does not own collection', async () => {
      const baseDoc: DatabaseCollection = {
        ...mockCollection,
        username: 'owner_only',
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(baseDoc as never);

      const result = await addQuestionToCollection(
        baseDoc._id.toString(),
        mockQuestionId1.toString(),
        'other_user',
      );

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error.toLowerCase()).toContain('does not own');
    });

    test('should return error when update fails', async () => {
      const baseDoc: DatabaseCollection = {
        ...mockCollection,
        _id: new mongoose.Types.ObjectId(),
        questions: [],
      } as unknown as DatabaseCollection;

      jest.spyOn(CollectionModel, 'findOne').mockResolvedValue(baseDoc as never);
      jest.spyOn(CollectionModel, 'findOneAndUpdate').mockResolvedValue(null as never);

      const result = await addQuestionToCollection(
        baseDoc._id.toString(),
        mockQuestionId1.toString(),
        baseDoc.username,
      );

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Failed to update collection');
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CollectionModel, 'findOne').mockRejectedValue(new Error('boom'));

      const result = await addQuestionToCollection(
        new mongoose.Types.ObjectId().toString(),
        mockQuestionId1.toString(),
        'user',
      );

      expect('error' in (result as unknown as Record<string, unknown>)).toBe(true);
      expect((result as { error: string }).error).toContain('Error when updating collection');
>>>>>>> 0f95291 (IP1 edits)
    });
  });
});
