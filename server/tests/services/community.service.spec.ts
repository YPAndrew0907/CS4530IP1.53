import mongoose from 'mongoose';
import CommunityModel from '../../models/community.model';
import {
  getCommunity,
  getAllCommunities,
  toggleCommunityMembership,
  createCommunity,
  deleteCommunity,
} from '../../services/community.service';
import { Community, DatabaseCommunity } from '../../types/types';
<<<<<<< HEAD
import assert from 'assert';
=======
>>>>>>> 0f95291 (IP1 edits)

describe('Community Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock community data with admin as participant
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

  const mockCommunityInput: Community = {
    name: 'New Community',
    description: 'New Description',
    admin: 'new_admin',
    participants: ['user1'],
    visibility: 'PRIVATE',
  };

  describe('getCommunity', () => {
    test('should return the community when found', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return error when community not found', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(mockCommunity as never);

      const result = await getCommunity(mockCommunity._id.toString());

      expect(CommunityModel.findById).toHaveBeenCalledWith(mockCommunity._id.toString());
      expect('error' in (result as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCommunity)._id.toString()).toBe(mockCommunity._id.toString());
    });

    test('should return error when community not found', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(null as never);

      const result = await getCommunity(new mongoose.Types.ObjectId().toString());

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CommunityModel, 'findById').mockRejectedValue(new Error('DB error'));

      const result = await getCommunity(mockCommunity._id.toString());

      expect('error' in (result as Record<string, unknown>)).toBe(true);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('getAllCommunities', () => {
    test('should return all communities', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should return empty array when no communities found', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      jest.spyOn(CommunityModel, 'find').mockResolvedValue([mockCommunity] as never);

      const result = await getAllCommunities();

      expect(CommunityModel.find).toHaveBeenCalledTimes(1);
      expect(Array.isArray(result)).toBe(true);
      expect((result as DatabaseCommunity[]).length).toBe(1);
      expect((result as DatabaseCommunity[])[0]._id.toString()).toBe(mockCommunity._id.toString());
    });

    test('should return empty array when no communities found', async () => {
      jest.spyOn(CommunityModel, 'find').mockResolvedValue([] as never);

      const result = await getAllCommunities();

      expect(Array.isArray(result)).toBe(true);
      expect((result as DatabaseCommunity[]).length).toBe(0);
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CommunityModel, 'find').mockRejectedValue(new Error('boom'));

      const result = await getAllCommunities();

      expect('error' in (result as Record<string, unknown>)).toBe(true);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('toggleCommunityMembership', () => {
    test('should add user to community when not a participant', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should remove user from community when already a participant', async () => {
      assert(false);
    });

    test('should return error when admin tries to leave their community', async () => {
      assert(false);
    });

    test('should return error when community not found', async () => {
      assert(false);
    });

    test('should return error when update fails', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        participants: ['admin_user', 'user1'],
      } as unknown as DatabaseCommunity);

      const updatedDoc: DatabaseCommunity = {
        ...mockCommunity,
        participants: ['admin_user', 'user1', 'new_user'],
      } as unknown as DatabaseCommunity;

      const updateSpy = jest
        .spyOn(CommunityModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedDoc as never);

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'new_user');

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect('error' in (result as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCommunity).participants).toContain('new_user');
    });

    test('should remove user from community when already a participant', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        participants: ['admin_user', 'member_user'],
      } as unknown as DatabaseCommunity);

      const updatedDoc: DatabaseCommunity = {
        ...mockCommunity,
        participants: ['admin_user'],
      } as unknown as DatabaseCommunity;

      const updateSpy = jest
        .spyOn(CommunityModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedDoc as never);

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'member_user');

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect('error' in (result as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCommunity).participants).not.toContain('member_user');
    });

    test('should return error when admin tries to leave their community', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        admin: 'admin_user',
        participants: ['admin_user', 'user1'],
      } as unknown as DatabaseCommunity);

      const updateSpy = jest.spyOn(CommunityModel, 'findByIdAndUpdate');

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'admin_user');

      expect(updateSpy).not.toHaveBeenCalled();
      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when community not found', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(null as never);

      const result = await toggleCommunityMembership(
        new mongoose.Types.ObjectId().toString(),
        'userX',
      );

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when update fails', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        participants: ['admin_user'],
      } as unknown as DatabaseCommunity);

      jest.spyOn(CommunityModel, 'findByIdAndUpdate').mockResolvedValue(null as never);

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'user2');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CommunityModel, 'findById').mockRejectedValue(new Error('db explode'));

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'user2');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    //duplicate entries for a user should be removed when leaving
    test('should remove all duplicate entries for a user when leaving', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        participants: ['admin_user', 'dup_user', 'dup_user'],
      } as unknown as DatabaseCommunity);

      jest.spyOn(CommunityModel, 'findByIdAndUpdate').mockResolvedValue({
        ...mockCommunity,
        participants: ['admin_user'],
      } as unknown as DatabaseCommunity);

      const result = await toggleCommunityMembership(mockCommunity._id.toString(), 'dup_user');

      expect('error' in (result as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCommunity).participants).toEqual(['admin_user']);
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('createCommunity', () => {
    test('should create a new community with admin in participants', async () => {
<<<<<<< HEAD
      assert(false);
    });

    test('should not duplicate admin in participants if already included', async () => {
      assert(false);
    });

    test('should set default visibility to PUBLIC if not provided', async () => {
      assert(false);
    });

    test('should return error when save fails', async () => {
      assert(false);
=======
      const createdDoc: DatabaseCommunity = {
        ...mockCommunity,
        _id: new mongoose.Types.ObjectId(),
        name: mockCommunityInput.name,
        description: mockCommunityInput.description,
        admin: mockCommunityInput.admin,
        participants: ['new_admin'], // final shape doesn't matter; we assert payload below
        visibility: 'PRIVATE',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as DatabaseCommunity;

      const createSpy = jest.spyOn(CommunityModel, 'create').mockResolvedValue(createdDoc as never);

      const result = await createCommunity(mockCommunityInput);

      expect(createSpy).toHaveBeenCalledTimes(1);
      // assert the payload that the service passed to Model.create
      const arg = (createSpy.mock.calls[0] as unknown[])[0] as any;
      expect(Array.isArray(arg.participants)).toBe(true);
      expect(arg.participants).toContain(mockCommunityInput.admin);
      const count = arg.participants.filter((p: string) => p === mockCommunityInput.admin).length;
      expect(count).toBe(1);
      expect('error' in (result as Record<string, unknown>)).toBe(false);
    });

    test('should not duplicate admin in participants if already included', async () => {
      const input: Community = {
        name: 'Dup Admin',
        description: 'Check duplicates',
        admin: 'dup_admin',
        participants: ['user1', 'dup_admin'],
        visibility: 'PUBLIC',
      } as unknown as Community;

      const createdDoc: DatabaseCommunity = {
        ...mockCommunity,
        _id: new mongoose.Types.ObjectId(),
        name: input.name,
        description: input.description,
        admin: input.admin,
        participants: input.participants,
        visibility: input.visibility as 'PUBLIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as DatabaseCommunity;

      const createSpy = jest.spyOn(CommunityModel, 'create').mockResolvedValue(createdDoc as never);

      await createCommunity(input);

      const arg = (createSpy.mock.calls[0] as unknown[])[0] as any;
      const count = Array.isArray(arg.participants)
        ? arg.participants.filter((p: string) => p === 'dup_admin').length
        : 0;
      expect(count).toBe(1);
    });

    test('should set default visibility to PUBLIC if not provided', async () => {
      const inputNoVis = {
        name: 'No Vis',
        description: 'Default vis',
        admin: 'vis_admin',
        participants: ['vis_admin'],
      } as unknown as Community;

      const createdDoc: DatabaseCommunity = {
        ...mockCommunity,
        _id: new mongoose.Types.ObjectId(),
        name: inputNoVis.name,
        description: inputNoVis.description,
        admin: inputNoVis.admin,
        participants: inputNoVis.participants,
        visibility: 'PUBLIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as DatabaseCommunity;

      const createSpy = jest.spyOn(CommunityModel, 'create').mockResolvedValue(createdDoc as never);

      await createCommunity(inputNoVis);

      const arg = (createSpy.mock.calls[0] as unknown[])[0] as any;
      expect(arg.visibility).toBe('PUBLIC');
    });

    test('should return error when save fails', async () => {
      jest.spyOn(CommunityModel, 'create').mockResolvedValue(null as never);

      const result = await createCommunity(mockCommunityInput);

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    // participants undefined should include admin exactly once
    test('should include admin exactly once when participants is undefined', async () => {
      const input = {
        name: 'With Undefined Participants',
        description: 'Ensure admin added',
        admin: 'admin_once',
        // participants intentionally omitted
      } as unknown as Community;

      const createdDoc: DatabaseCommunity = {
        ...mockCommunity,
        _id: new mongoose.Types.ObjectId(),
        name: input.name,
        description: input.description,
        admin: input.admin,
        participants: [input.admin],
        visibility: 'PUBLIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as DatabaseCommunity;

      const createSpy = jest.spyOn(CommunityModel, 'create').mockResolvedValue(createdDoc as never);

      await createCommunity(input);

      const arg = (createSpy.mock.calls[0] as unknown[])[0] as any;
      expect(Array.isArray(arg.participants)).toBe(true);
      expect(arg.participants).toContain('admin_once');
      const count = arg.participants.filter((p: string) => p === 'admin_once').length;
      expect(count).toBe(1);
    });

    // preserves provided PRIVATE visibility
    test('should preserve provided PRIVATE visibility', async () => {
      const createSpy = jest.spyOn(CommunityModel, 'create').mockResolvedValue({
        ...mockCommunity,
        _id: new mongoose.Types.ObjectId(),
        name: mockCommunityInput.name,
        description: mockCommunityInput.description,
        admin: mockCommunityInput.admin,
        participants: ['new_admin'],
        visibility: 'PRIVATE',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as DatabaseCommunity as never);

      await createCommunity(mockCommunityInput);

      const arg = (createSpy.mock.calls[0] as unknown[])[0] as any;
      expect(arg.visibility).toBe('PRIVATE');
>>>>>>> 0f95291 (IP1 edits)
    });
  });

  describe('deleteCommunity', () => {
    test('should delete community when user is admin', async () => {
      // Verify admin status before deletion
<<<<<<< HEAD
      assert(false);
    });

    test('should return error when user is not admin', async () => {
      assert(false);
    });

    test('should return error when community not found during check', async () => {
      assert(false);
    });

    test('should return error when deletion fails', async () => {
      assert(false);
    });

    test('should return error when database throws error', async () => {
      assert(false);
=======
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(mockCommunity as never);
      const deleteSpy = jest
        .spyOn(CommunityModel, 'findOneAndDelete')
        .mockResolvedValue(mockCommunity as never);

      const result = await deleteCommunity(mockCommunity._id.toString(), 'admin_user');

      expect(CommunityModel.findById).toHaveBeenCalledWith(mockCommunity._id.toString());
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect('error' in (result as Record<string, unknown>)).toBe(false);
      expect((result as DatabaseCommunity)._id.toString()).toBe(mockCommunity._id.toString());
    });

    test('should return error when user is not admin', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        admin: 'someone_else',
      } as unknown as DatabaseCommunity);

      const result = await deleteCommunity(mockCommunity._id.toString(), 'not_admin');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when community not found during check', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(null as never);

      const result = await deleteCommunity(new mongoose.Types.ObjectId().toString(), 'admin_user');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when deletion fails', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(mockCommunity as never);
      jest.spyOn(CommunityModel, 'findOneAndDelete').mockResolvedValue(null as never);

      const result = await deleteCommunity(mockCommunity._id.toString(), 'admin_user');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    test('should return error when database throws error', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue(mockCommunity as never);
      jest.spyOn(CommunityModel, 'findOneAndDelete').mockRejectedValue(new Error('db err'));

      const result = await deleteCommunity(mockCommunity._id.toString(), 'admin_user');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    // NEW TEST: non-admin should not attempt deletion
    test('should not call deletion when user is not admin', async () => {
      jest.spyOn(CommunityModel, 'findById').mockResolvedValue({
        ...mockCommunity,
        admin: 'real_admin',
      } as unknown as DatabaseCommunity);

      const deleteSpy = jest.spyOn(CommunityModel, 'findOneAndDelete');

      const result = await deleteCommunity(mockCommunity._id.toString(), 'not_admin');

      expect(deleteSpy).not.toHaveBeenCalled();
      expect('error' in (result as Record<string, unknown>)).toBe(true);
    });

    // NEW TEST: returns error when pre-check (findById) throws
    test('should return error when pre-check throws', async () => {
      jest.spyOn(CommunityModel, 'findById').mockRejectedValue(new Error('pre-check boom'));

      const result = await deleteCommunity(mockCommunity._id.toString(), 'admin_user');

      expect('error' in (result as Record<string, unknown>)).toBe(true);
>>>>>>> 0f95291 (IP1 edits)
    });
  });
});
