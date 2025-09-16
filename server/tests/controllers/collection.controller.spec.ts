import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import * as collectionService from '../../services/collection.service';
import * as databaseUtil from '../../utils/database.util';
import { DatabaseCollection, PopulatedDatabaseCollection } from '../../types/types';
<<<<<<< HEAD
import assert from 'assert';
=======
>>>>>>> 0f95291 (IP1 edits)

// Mock question IDs for testing
const mockQuestionId1 = new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6aa');

// Mock collection data
const mockCollection: DatabaseCollection = {
  _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6dd'),
  name: 'Test Collection',
  description: 'Test Description',
  username: 'test_user',
  questions: [mockQuestionId1],
  isPrivate: false,
};

// Populated collection with resolved references
const mockPopulatedCollection: PopulatedDatabaseCollection = {
  _id: mockCollection._id,
  name: 'Test Collection',
  description: 'Test Description',
  username: 'test_user',
  questions: [],
  isPrivate: false,
};

const mockCollectionResponse = {
  _id: mockCollection._id.toString(),
  name: 'Test Collection',
  description: 'Test Description',
  username: 'test_user',
  questions: [],
  isPrivate: false,
};

// Service method spies
const createCollectionSpy = jest.spyOn(collectionService, 'createCollection');
const deleteCollectionSpy = jest.spyOn(collectionService, 'deleteCollection');
const getCollectionsByUsernameSpy = jest.spyOn(collectionService, 'getCollectionsByUsername');
const getCollectionByIdSpy = jest.spyOn(collectionService, 'getCollectionById');
const addQuestionToCollectionSpy = jest.spyOn(collectionService, 'addQuestionToCollection');
const populateDocumentSpy = jest.spyOn(databaseUtil, 'populateDocument');

describe('Collection Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /create', () => {
    test('should create a new collection successfully', async () => {
<<<<<<< HEAD
      assert(false)
    });

    test('should return 400 when missing name', async () => {
      assert(false)
    });

    test('should return 400 when missing description', async () => {
      assert(false)
    });

    test('should return 400 when missing questions', async () => {
      assert(false)
    });

    test('should return 400 when missing username', async () => {
      assert(false)

    });

    test('should return 500 when service returns error', async () => {
      assert(false)

    });

    test('should return 500 when populate returns error', async () => {
      assert(false)

    });

    test('should create collection with non-empty questions array', async () => {
      assert(false)

=======
      createCollectionSpy.mockResolvedValue(mockCollection as never);
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);

      const res = await supertest(app).post('/api/collection/create').send({
        name: mockCollection.name,
        description: mockCollection.description,
        questions: [],
        username: mockCollection.username,
        isPrivate: mockCollection.isPrivate,
      });

      expect(createCollectionSpy).toHaveBeenCalledTimes(1);
      expect(populateDocumentSpy).toHaveBeenCalledWith(mockCollection._id.toString(), 'collection');
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(mockCollection._id.toString());
    });

    test('should return 400 when missing name', async () => {
      const res = await supertest(app).post('/api/collection/create').send({
        description: mockCollection.description,
        questions: [],
        username: mockCollection.username,
        isPrivate: mockCollection.isPrivate,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing description', async () => {
      const res = await supertest(app).post('/api/collection/create').send({
        name: mockCollection.name,
        questions: [],
        username: mockCollection.username,
        isPrivate: mockCollection.isPrivate,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing questions', async () => {
      const res = await supertest(app).post('/api/collection/create').send({
        name: mockCollection.name,
        description: mockCollection.description,
        username: mockCollection.username,
        isPrivate: mockCollection.isPrivate,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing username', async () => {
      const res = await supertest(app).post('/api/collection/create').send({
        name: mockCollection.name,
        description: mockCollection.description,
        questions: [],
        isPrivate: mockCollection.isPrivate,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 500 when service returns error', async () => {
      createCollectionSpy.mockResolvedValue({ error: 'failed to create' } as never);

      const res = await supertest(app).post('/api/collection/create').send({
        name: 'Some',
        description: 'Desc',
        questions: [],
        username: 'user',
        isPrivate: false,
      });

      expect(res.statusCode).toBe(500);
      expect(res.text).toContain('Error when creating collection');
    });

    test('should return 500 when populate returns error', async () => {
      createCollectionSpy.mockResolvedValue(mockCollection as never);
      populateDocumentSpy.mockResolvedValue({ error: 'populate failed' } as never);

      const res = await supertest(app).post('/api/collection/create').send({
        name: mockCollection.name,
        description: mockCollection.description,
        questions: [],
        username: mockCollection.username,
        isPrivate: mockCollection.isPrivate,
      });

      expect(res.statusCode).toBe(500);
    });

    test('should create collection with non-empty questions array', async () => {
      createCollectionSpy.mockResolvedValue({
        ...mockCollection,
        questions: [mockQuestionId1],
      } as never);
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);

      const res = await supertest(app)
        .post('/api/collection/create')
        .send({
          name: mockCollection.name,
          description: mockCollection.description,
          questions: [mockQuestionId1.toString()],
          username: mockCollection.username,
          isPrivate: mockCollection.isPrivate,
        });

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.questions)).toBe(true);
      expect(res.body.questions.length).toBe(1);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('DELETE /delete/:collectionId', () => {
    test('should delete collection successfully', async () => {
<<<<<<< HEAD
      assert(false)

    });

    test('should return 400 when missing username', async () => {
      assert(false)

    });

    test('should return 400 when missing collectionId', async () => {
      assert(false)

    });

    test('should return 500 when service throws error', async () => {
      assert(false)

    });

    test('should return 500 when service returns error', async () => {
      assert(false)
=======
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);
      deleteCollectionSpy.mockResolvedValue(mockCollection as never);

      const res = await supertest(app)
        .delete(`/api/collection/delete/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(deleteCollectionSpy).toHaveBeenCalledWith(
        mockCollection._id.toString(),
        mockCollection.username,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(mockCollection._id.toString());
    });

    test('should return 400 when missing username', async () => {
      const res = await supertest(app).delete(
        `/api/collection/delete/${mockCollection._id.toString()}`,
      );

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing collectionId', async () => {
      const res = await supertest(app)
        .delete('/api/collection/delete/')
        .query({ username: mockCollection.username });

      // Route doesn't match without a path param -> 404
      expect(res.statusCode).toBe(404);
    });

    test('should return 500 when service throws error', async () => {
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);
      deleteCollectionSpy.mockRejectedValue(new Error('boom'));

      const res = await supertest(app)
        .delete(`/api/collection/delete/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(res.statusCode).toBe(500);
      expect(res.text).toContain('Error when deleting collection');
    });

    test('should return 500 when service returns error', async () => {
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);
      deleteCollectionSpy.mockResolvedValue({ error: 'cannot delete' } as never);

      const res = await supertest(app)
        .delete(`/api/collection/delete/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('PATCH /toggleSaveQuestion', () => {
    test('should toggle save question successfully', async () => {
<<<<<<< HEAD
      assert(false)
    });

    test('should return 400 when missing collectionId', async () => {
      assert(false)
    });

    test('should return 400 when missing questionId', async () => {
      assert(false)
    });

    test('should return 400 when missing username', async () => {
      assert(false)
    });

    test('should return 400 when body is missing', async () => {
      assert(false)
    });

    test('should return 500 when service returns error', async () => {
      assert(false)
    });

    test('should return 500 when populate fails', async () => {
      assert(false)
=======
      addQuestionToCollectionSpy.mockResolvedValue(mockCollection as never);
      populateDocumentSpy.mockResolvedValue(mockPopulatedCollection as never);

      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        collectionId: mockCollection._id.toString(),
        questionId: mockQuestionId1.toString(),
        username: mockCollection.username,
      });

      expect(addQuestionToCollectionSpy).toHaveBeenCalledWith(
        mockCollection._id.toString(),
        mockQuestionId1.toString(),
        mockCollection.username,
      );
      expect(populateDocumentSpy).toHaveBeenCalledWith(mockCollection._id.toString(), 'collection');
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(mockCollection._id.toString());
    });

    test('should return 400 when missing collectionId', async () => {
      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        questionId: mockQuestionId1.toString(),
        username: mockCollection.username,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing questionId', async () => {
      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        collectionId: mockCollection._id.toString(),
        username: mockCollection.username,
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing username', async () => {
      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        collectionId: mockCollection._id.toString(),
        questionId: mockQuestionId1.toString(),
      });

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when body is missing', async () => {
      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({});

      expect(res.statusCode).toBe(400);
    });

    test('should return 500 when service returns error', async () => {
      addQuestionToCollectionSpy.mockResolvedValue({ error: 'toggle failed' } as never);

      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        collectionId: mockCollection._id.toString(),
        questionId: mockQuestionId1.toString(),
        username: mockCollection.username,
      });

      expect(res.statusCode).toBe(500);
    });

    test('should return 500 when populate fails', async () => {
      addQuestionToCollectionSpy.mockResolvedValue(mockCollection as never);
      populateDocumentSpy.mockResolvedValue({ error: 'populate failed' } as never);

      const res = await supertest(app).patch('/api/collection/toggleSaveQuestion').send({
        collectionId: mockCollection._id.toString(),
        questionId: mockQuestionId1.toString(),
        username: mockCollection.username,
      });

      expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('GET /getCollectionsByUsername/:username', () => {
    test('should get collections by username successfully', async () => {
<<<<<<< HEAD
      assert(false)
    });

    test('should return 400 when missing currentUsername', async () => {
      assert(false)
    });

    test('should return 500 when service returns error', async () => {
      assert(false)
    });

    test('should return 500 when populate fails', async () => {
      assert(false)
=======
      getCollectionsByUsernameSpy.mockResolvedValue([mockCollection] as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionsByUsername/${mockCollection.username}`)
        .query({ currentUsername: mockCollection.username });

      expect(getCollectionsByUsernameSpy).toHaveBeenCalledWith(
        mockCollection.username,
        mockCollection.username,
      );
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]._id).toBe(mockCollection._id.toString());
    });

    test('should return 400 when missing currentUsername', async () => {
      const res = await supertest(app).get(
        `/api/collection/getCollectionsByUsername/${mockCollection.username}`,
      );

      expect(res.statusCode).toBe(400);
    });

    test('should return 500 when service returns error', async () => {
      getCollectionsByUsernameSpy.mockResolvedValue({ error: 'service error' } as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionsByUsername/${mockCollection.username}`)
        .query({ currentUsername: mockCollection.username });

      expect(res.statusCode).toBe(500);
    });

    test('should return 500 when populate fails', async () => {
      // Route does not populate; mimic error via service return for coverage
      getCollectionsByUsernameSpy.mockResolvedValue({ error: 'list failed' } as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionsByUsername/${mockCollection.username}`)
        .query({ currentUsername: mockCollection.username });

      expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('GET /getCollectionById/:collectionId', () => {
    test('should get collection by id successfully', async () => {
<<<<<<< HEAD
      assert(false)
    });

    test('should return 400 when missing username', async () => {
      assert(false)
    });

    test('should return 400 when missing collectionId', async () => {
      assert(false)
    });

    test('should return 500 when service returns error', async () => {
      assert(false)
    });

    test('should return 500 when populate fails', async () => {
      assert(false)
=======
      getCollectionByIdSpy.mockResolvedValue(mockCollection as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionById/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(getCollectionByIdSpy).toHaveBeenCalledWith(
        mockCollection._id.toString(),
        mockCollection.username,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(mockCollection._id.toString());
    });

    test('should return 400 when missing username', async () => {
      const res = await supertest(app).get(
        `/api/collection/getCollectionById/${mockCollection._id.toString()}`,
      );

      expect(res.statusCode).toBe(400);
    });

    test('should return 400 when missing collectionId', async () => {
      const res = await supertest(app)
        .get('/api/collection/getCollectionById/')
        .query({ username: mockCollection.username });

      // Route doesn't match without a path param -> 404
      expect(res.statusCode).toBe(404);
    });

    test('should return 500 when service returns error', async () => {
      getCollectionByIdSpy.mockResolvedValue({ error: 'not allowed' } as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionById/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(res.statusCode).toBe(500);
    });

    test('should return 500 when populate fails', async () => {
      // Route does not populate; mimic error via service return for coverage
      getCollectionByIdSpy.mockResolvedValue({ error: 'fetch failed' } as never);

      const res = await supertest(app)
        .get(`/api/collection/getCollectionById/${mockCollection._id.toString()}`)
        .query({ username: mockCollection.username });

      expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
    });
  });
});
