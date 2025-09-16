import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import * as communityService from '../../services/community.service';
import { DatabaseCommunity } from '../../types/types';
<<<<<<< HEAD
import assert from 'assert';
=======
>>>>>>> 0f95291 (IP1 edits)

// Mock community data for testing
const mockCommunity: DatabaseCommunity = {
  _id: new mongoose.Types.ObjectId('65e9b58910afe6e94fc6e6dc'),
  name: 'Test Community',
  description: 'Test Description',
  admin: 'admin_user',
  participants: ['admin_user', 'user1', 'user2'],
  visibility: 'PUBLIC',
  createdAt: new Date('2024-03-01'),
  updatedAt: new Date('2024-03-01'),
};

// Expected JSON response format
const mockCommunityResponse = {
  _id: mockCommunity._id.toString(),
  name: 'Test Community',
  description: 'Test Description',
  admin: 'admin_user',
  participants: ['admin_user', 'user1', 'user2'],
  visibility: 'PUBLIC',
  createdAt: new Date('2024-03-01').toISOString(),
  updatedAt: new Date('2024-03-01').toISOString(),
};

// Service method spies
const getCommunityspy = jest.spyOn(communityService, 'getCommunity');
const getAllCommunitiesSpy = jest.spyOn(communityService, 'getAllCommunities');
const toggleCommunityMembershipSpy = jest.spyOn(communityService, 'toggleCommunityMembership');
const createCommunitySpy = jest.spyOn(communityService, 'createCommunity');
const deleteCommunitySpy = jest.spyOn(communityService, 'deleteCommunity');

describe('Community Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /getCommunity/:communityId', () => {
    test('should return community when found', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return 500 when community not found', async () => {
      assert(false);
    });

    test('should return 500 when service throws error', async () => {
      assert(false);
=======
      getCommunityspy.mockResolvedValue(mockCommunity as never);

      const res = await supertest(app).get(
        `/api/community/getCommunity/${mockCommunity._id.toString()}`,
      );

      expect(getCommunityspy).toHaveBeenCalledWith(mockCommunity._id.toString());
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(mockCommunityResponse._id);
      expect(res.body.name).toBe(mockCommunityResponse.name);
      expect(res.body.description).toBe(mockCommunityResponse.description);
      expect(res.body.admin).toBe(mockCommunityResponse.admin);
      expect(res.body.visibility).toBe(mockCommunityResponse.visibility);
      expect(res.body.participants).toEqual(
        expect.arrayContaining(mockCommunityResponse.participants),
      );
      expect(res.body.createdAt).toBe(mockCommunityResponse.createdAt);
      expect(res.body.updatedAt).toBe(mockCommunityResponse.updatedAt);
    });

    test('should return 500 when community not found', async () => {
      getCommunityspy.mockResolvedValue({ error: 'not found' } as never);

      const res = await supertest(app).get(
        `/api/community/getCommunity/${mockCommunity._id.toString()}`,
      );

      expect(res.statusCode).toBe(500);
    });

    test('should return 500 when service throws error', async () => {
      getCommunityspy.mockRejectedValue(new Error('DB fail'));

      const res = await supertest(app).get(
        `/api/community/getCommunity/${mockCommunity._id.toString()}`,
      );

      expect(res.statusCode).toBe(500);
    });

    //missing path param of 404 (route does not match issusse)
    test('should return 404 when communityId path param is missing', async () => {
      const res = await supertest(app).get('/api/community/getCommunity/');
      expect(res.statusCode).toBe(404);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('GET /getAllCommunities', () => {
    test('should return all communities', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return empty array when no communities', async () => {
      assert(false);
    });

    test('should return 500 when service returns error', async () => {
      assert(false);
    });

    describe('POST /toggleMembership', () => {
      test('should successfully toggle membership when adding user', async () => {
        assert(false);
      });

      test('should successfully toggle membership when removing user', async () => {
        assert(false);
      });

      test('should return 400 when missing communityId', async () => {
        assert(false);
      });

      test('should return 400 when missing username', async () => {
        assert(false);
      });

      test('should return 403 when admin tries to leave', async () => {
        assert(false);
      });

      test('should return 404 when community not found', async () => {
        assert(false);
      });

      test('should return 500 for other errors', async () => {
        assert(false);
=======
      getAllCommunitiesSpy.mockResolvedValue([mockCommunity] as never);

      const res = await supertest(app).get('/api/community/getAllCommunities');

      expect(getAllCommunitiesSpy).toHaveBeenCalledTimes(1);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0]._id).toBe(mockCommunityResponse._id);
      expect(res.body[0].name).toBe(mockCommunityResponse.name);
      expect(res.body[0].createdAt).toBe(mockCommunityResponse.createdAt);
      expect(res.body[0].updatedAt).toBe(mockCommunityResponse.updatedAt);
    });

    test('should return empty array when no communities', async () => {
      getAllCommunitiesSpy.mockResolvedValue([] as never);

      const res = await supertest(app).get('/api/community/getAllCommunities');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    test('should return 500 when service returns error', async () => {
      getAllCommunitiesSpy.mockResolvedValue({ error: 'db error' } as never);

      const res = await supertest(app).get('/api/community/getAllCommunities');

      expect(res.statusCode).toBe(500);
    });







    

    describe('POST /toggleMembership', () => {
      test('should successfully toggle membership when adding user', async () => {
        const updated: DatabaseCommunity = {
          ...mockCommunity,
          participants: [...mockCommunity.participants, 'new_user'],
        } as unknown as DatabaseCommunity;

        toggleCommunityMembershipSpy.mockResolvedValue(updated as never);

        const res = await supertest(app).post('/api/community/toggleMembership').send({
          communityId: mockCommunity._id.toString(),
          username: 'new_user',
        });

        expect(toggleCommunityMembershipSpy).toHaveBeenCalledWith(
          mockCommunity._id.toString(),
          'new_user',
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.participants).toContain('new_user');
      });

      test('should successfully toggle membership when removing user', async () => {
        const updated: DatabaseCommunity = {
          ...mockCommunity,
          participants: ['admin_user', 'user2'],
        } as unknown as DatabaseCommunity;

        toggleCommunityMembershipSpy.mockResolvedValue(updated as never);

        const res = await supertest(app).post('/api/community/toggleMembership').send({
          communityId: mockCommunity._id.toString(),
          username: 'user1',
        });

        expect(toggleCommunityMembershipSpy).toHaveBeenCalledWith(
          mockCommunity._id.toString(),
          'user1',
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.participants).not.toContain('user1');
      });

      test('should return 400 when missing communityId', async () => {
        const res = await supertest(app)
          .post('/api/community/toggleMembership')
          .send({ username: 'userX' });

        expect(res.statusCode).toBe(400);
      });

      test('should return 400 when missing username', async () => {
        const res = await supertest(app)
          .post('/api/community/toggleMembership')
          .send({ communityId: mockCommunity._id.toString() });

        expect(res.statusCode).toBe(400);
      });

      test('should return 403 when admin tries to leave', async () => {
        toggleCommunityMembershipSpy.mockResolvedValue({
          error: 'Admin cannot leave their community',
        } as never);

        const res = await supertest(app).post('/api/community/toggleMembership').send({
          communityId: mockCommunity._id.toString(),
          username: 'admin_user',
        });

        expect(res.statusCode).toBe(403);
      });

      test('should return 404 when community not found', async () => {
        toggleCommunityMembershipSpy.mockResolvedValue({
          error: 'Community not found',
        } as never);

        const res = await supertest(app).post('/api/community/toggleMembership').send({
          communityId: mockCommunity._id.toString(),
          username: 'userX',
        });

        expect(res.statusCode).toBe(404);
      });

      test('should return 500 for other errors', async () => {
        toggleCommunityMembershipSpy.mockResolvedValue({
          error: 'DB error',
        } as never);

        const res = await supertest(app).post('/api/community/toggleMembership').send({
          communityId: mockCommunity._id.toString(),
          username: 'userX',
        });

        expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
      });
    });

    describe('POST /create', () => {
      test('should create a new community successfully', async () => {
<<<<<<< HEAD
        assert(false);
      });

      test('should create community with default visibility when not provided', async () => {
        assert(false);
      });

      test('should return 400 when missing name', async () => {
        assert(false);
      });

      test('should return 400 when missing description', async () => {
        assert(false);
      });

      test('should return 400 when missing admin', async () => {
        assert(false);
      });

      test('should return 500 when service returns error', async () => {
        assert(false);
=======
        createCommunitySpy.mockResolvedValue(mockCommunity as never);

        const res = await supertest(app).post('/api/community/create').send({
          name: mockCommunity.name,
          description: mockCommunity.description,
          admin: mockCommunity.admin,
          participants: mockCommunity.participants,
          visibility: mockCommunity.visibility,
        });

        expect(createCommunitySpy).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(mockCommunity._id.toString());
        expect(res.body.name).toBe(mockCommunity.name);
      });

      test('should create community with default visibility when not provided', async () => {
        const created: DatabaseCommunity = {
          ...mockCommunity,
          visibility: 'PUBLIC',
        } as unknown as DatabaseCommunity;

        createCommunitySpy.mockResolvedValue(created as never);

        const res = await supertest(app).post('/api/community/create').send({
          name: mockCommunity.name,
          description: mockCommunity.description,
          admin: mockCommunity.admin,
          participants: mockCommunity.participants,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.visibility).toBe('PUBLIC');
      });

      test('should return 400 when missing name', async () => {
        const res = await supertest(app).post('/api/community/create').send({
          description: mockCommunity.description,
          admin: mockCommunity.admin,
          participants: mockCommunity.participants,
          visibility: mockCommunity.visibility,
        });

        expect(res.statusCode).toBe(400);
      });

      test('should return 400 when missing description', async () => {
        const res = await supertest(app).post('/api/community/create').send({
          name: mockCommunity.name,
          admin: mockCommunity.admin,
          participants: mockCommunity.participants,
          visibility: mockCommunity.visibility,
        });

        expect(res.statusCode).toBe(400);
      });

      test('should return 400 when missing admin', async () => {
        const res = await supertest(app).post('/api/community/create').send({
          name: mockCommunity.name,
          description: mockCommunity.description,
          participants: mockCommunity.participants,
          visibility: mockCommunity.visibility,
        });

        expect(res.statusCode).toBe(400);
      });

      test('should return 500 when service returns error', async () => {
        createCommunitySpy.mockResolvedValue({ error: 'failed' } as never);

        const res = await supertest(app).post('/api/community/create').send({
          name: mockCommunity.name,
          description: mockCommunity.description,
          admin: mockCommunity.admin,
          participants: mockCommunity.participants,
          visibility: mockCommunity.visibility,
        });

        expect(res.statusCode).toBe(500);
>>>>>>> 0f95291 (IP1 edits)
      });
    });

    describe('DELETE /delete/:communityId', () => {
      test('should delete community successfully when user is admin', async () => {
<<<<<<< HEAD
        assert(false);
      });

      test('should return 400 when missing username', async () => {
        assert(false);
      });

      test('should return 400 when username is empty string', async () => {
        assert(false);
      });

      test('should return 403 when user is not admin', async () => {
        assert(false);
      });

      test('should return 404 when community not found', async () => {
        assert(false);
      });

      test('should return 500 for other errors', async () => {
        assert(false);
      });
    });
    });
  });
=======
        deleteCommunitySpy.mockResolvedValue(mockCommunity as never);

        const res = await supertest(app)
          .delete(`/api/community/delete/${mockCommunity._id.toString()}`)
          .query({ username: mockCommunity.admin });

        expect(deleteCommunitySpy).toHaveBeenCalledWith(
          mockCommunity._id.toString(),
          mockCommunity.admin,
        );
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(mockCommunity._id.toString());
      });

      test('should return 400 when missing username', async () => {
        const res = await supertest(app).delete(
          `/api/community/delete/${mockCommunity._id.toString()}`,
        );

        expect(res.statusCode).toBe(400);
      });

      test('should return 400 when username is empty string', async () => {
        const res = await supertest(app)
          .delete(`/api/community/delete/${mockCommunity._id.toString()}`)
          .query({ username: '' });

        expect(res.statusCode).toBe(400);
      });

      test('should return 403 when user is not admin', async () => {
        deleteCommunitySpy.mockResolvedValue({
          error: 'Only admin can delete',
        } as never);

        const res = await supertest(app)
          .delete(`/api/community/delete/${mockCommunity._id.toString()}`)
          .query({ username: 'not_admin' });

        expect(res.statusCode).toBe(403);
      });

      test('should return 404 when community not found', async () => {
        deleteCommunitySpy.mockResolvedValue({
          error: 'Community not found',
        } as never);

        const res = await supertest(app)
          .delete(`/api/community/delete/${mockCommunity._id.toString()}`)
          .query({ username: mockCommunity.admin });

        expect(res.statusCode).toBe(404);
      });

      test('should return 500 for other errors', async () => {
        deleteCommunitySpy.mockResolvedValue({ error: 'db err' } as never);

        const res = await supertest(app)
          .delete(`/api/community/delete/${mockCommunity._id.toString()}`)
          .query({ username: mockCommunity.admin });

        expect(res.statusCode).toBe(500);
      });
    });
  });
});
>>>>>>> 0f95291 (IP1 edits)
