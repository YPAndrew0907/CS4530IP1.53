import CommunityModel from '../models/community.model';
import { Community, CommunityResponse, DatabaseCommunity } from '../types/types';

/**
 * Service for community-related operations.
 * Provides functions to retrieve, create, update and delete communities.
 * Each function returns either a community document (or array of documents)
 * or an object containing an error message under the `error` key.
 */

/**
 * Retrieve a single community by its ID.
 *
 * @param communityId - The ID of the community to retrieve
 * @returns A promise that resolves with the community document or an error object
 */
export const getCommunity = async (communityId: string): Promise<CommunityResponse> => {
  try {
    const doc = await CommunityModel.findById(communityId);
    if (!doc) {
      return { error: 'Community not found' };
    }
    return doc as DatabaseCommunity;
  } catch (err) {
    return { error: `Error when retrieving community: ${(err as Error).message}` };
  }
};

/**
 * Retrieve all communities in the database.
 *
 * @returns A promise that resolves with an array of community documents or an error object
 */
export const getAllCommunities = async (): Promise<DatabaseCommunity[] | { error: string }> => {
  try {
    const docs = await CommunityModel.find();
    if (!docs) {
      return { error: 'Failed to retrieve communities' };
    }
    return docs as unknown as DatabaseCommunity[];
  } catch (err) {
    return { error: `Error when retrieving communities: ${(err as Error).message}` };
  }
};

/**
 * Toggle a user's membership status in a community.
 * If the user is already a participant they will be removed, otherwise they will be added.
 * Admin users cannot remove themselves from their own community.
 *
 * @param communityId - The ID of the community to update
 * @param username - The username of the user whose membership to toggle
 * @returns A promise that resolves with the updated community document or an error object
 */
export const toggleCommunityMembership = async (
  communityId: string,
  username: string,
): Promise<CommunityResponse> => {
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
};

/**
 * Create a new community.
 * Ensures that required fields are present and that the admin is included in the participants list.
 *
 * @param communityData - Object containing community details including name, description, visibility, admin, and participants
 * @returns A promise that resolves with the newly created community document or an error object
 */
export const createCommunity = async (communityData: Community): Promise<CommunityResponse> => {
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
};

/**
 * Delete a community by its ID. The requesting user must be the admin of the community.
 *
 * @param communityId - The ID of the community to delete
 * @param username - The username of the user requesting deletion
 * @returns A promise that resolves with the deleted community document or an error object
 */
export const deleteCommunity = async (
  communityId: string,
  username: string,
): Promise<CommunityResponse> => {
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
