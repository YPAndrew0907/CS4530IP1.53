import CommunityModel from '../models/community.model';
import { Community, CommunityResponse, DatabaseCommunity } from '../types/types';

/**
 * Task 2.4.1 - 3 points
 * Write a function to retrieve a community by its ID.
 * @param communityId - The ID of the community to retrieve
 * @returns A Promise resolving to the community document or an error object
 */
export const getCommunity = async (communityId: string): Promise<CommunityResponse> => {
  // - Write your code here -
<<<<<<< HEAD

  return { error: 'Not implemented' };
=======
  try {
    const doc = await CommunityModel.findById(communityId);
    if (!doc) {
      return { error: 'Community not found' };
    }
    return doc as DatabaseCommunity;
  } catch (err) {
    return { error: `Error when retrieving community: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 2.4.2 - 3 points
 * Write a function to retrieve all communities in the database.
 * @returns A Promise resolving to an array of community documents or an error object
 */
export const getAllCommunities = async (): Promise<DatabaseCommunity[] | { error: string }> => {
  // - Write your code here -
<<<<<<< HEAD

  return { error: 'Not implemented' };
=======
  try {
    const docs = await CommunityModel.find();
    if (!docs) {
      return { error: 'Failed to retrieve communities' };
    }
    return docs as unknown as DatabaseCommunity[];
  } catch (err) {
    return { error: `Error when retrieving communities: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 2.4.3 - 5 points
 * Write a function to toggle a user's membership status in a community.
 * If the user is already a participant, they will be removed.
 * If the user is not a participant, they will be added.
 * @param communityId - The ID of the community to update
 * @param username - The username of the user whose membership to toggle
 * @returns A Promise resolving to the updated community document or an error object
 */
export const toggleCommunityMembership = async (
  communityId: string,
  username: string,
): Promise<CommunityResponse> => {
  // - Write your code here -
<<<<<<< HEAD

  return { error: 'Not implemented' };
=======
  try {
    if (!communityId || !username) {
      throw new Error('Invalid toggle membership body');
    }

    const current = await CommunityModel.findById(communityId);
    if (!current) {
      return { error: 'Community not found' };
    }

    const isMember = (current.participants ?? []).includes(username);

    // Admin cannot leave their own community
    if (isMember && current.admin === username) {
      return { error: 'Admin cannot leave the community' };
    }

    const update = isMember
      ? { $pull: { participants: username } }
      : { $addToSet: { participants: username } };

    const updated = await CommunityModel.findByIdAndUpdate(communityId, update, { new: true });
    if (!updated) {
      return { error: 'Failed to update community membership' };
    }
    return updated as DatabaseCommunity;
  } catch (err) {
    return {
      error: `Error when toggling community membership: ${(err as Error).message}`,
    };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 2.4.4 - 5 points
 * Write a function to create a new community.
 * The participants list must include the admin user.
 * @param communityData - Object containing community details including name, description, visibility, admin, and participants
 * @returns A Promise resolving to the newly created community document or an error object
 */
export const createCommunity = async (communityData: Community): Promise<CommunityResponse> => {
  // - Write your code here -
<<<<<<< HEAD

  return { error: 'Not implemented' };
=======
  try {
    const { name, description, admin, visibility, participants } = communityData as unknown as {
      name: string;
      description: string;
      admin: string;
      visibility?: string;
      participants?: string[];
    };

    if (!name || !description || !admin) {
      throw new Error('Invalid community body');
    }

    const uniqueParticipants = Array.from(new Set([...(participants ?? []), admin]));

    const created = await CommunityModel.create({
      name,
      description,
      admin,
      visibility: visibility ?? 'PUBLIC',
      participants: uniqueParticipants,
      questions: [],
    });

    if (!created) {
      throw new Error('Failed to create community');
    }

    return created as DatabaseCommunity;
  } catch (err) {
    return { error: `Error when creating community: ${(err as Error).message}` };
  }
>>>>>>> 0f95291 (IP1 edits)
};

/**
 * Task 2.4.5 - 4 points
 * Write a function to delete a community by its ID.
 * The user must be the admin of the community to delete it.
 * Handle errors appropriately.
 * @param communityId - The ID of the community to delete
 * @param username - The username of the user requesting deletion
 * @returns A Promise resolving to a success object or an error object
 */
export const deleteCommunity = async (
  communityId: string,
  username: string,
): Promise<CommunityResponse> => {
  // - Write your code here -
<<<<<<< HEAD

  return { error: 'Not implemented' };
};
=======
  try {
    if (!communityId || !username) {
      throw new Error('Invalid delete request');
    }

    const current = await CommunityModel.findById(communityId);
    if (!current) {
      return { error: 'Community not found' };
    }
    if (current.admin !== username) {
      return { error: 'User is not admin of the community' };
    }

    const deleted = await CommunityModel.findByIdAndDelete(communityId);
    if (!deleted) {
      return { error: 'Failed to delete community' };
    }

    return deleted as DatabaseCommunity;
  } catch (err) {
    return { error: `Error when deleting community: ${(err as Error).message}` };
  }
};
>>>>>>> 0f95291 (IP1 edits)
