import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Community collection.
 *
 * Fields:
 * - `name`: unique name of the community (required)
 * - `description`: a description of the community (required)
 * - `admin`: the username of the admin user who created the community (required)
 * - `participants`: array of usernames who are part of the community (defaults to empty array)
 * - `visibility`: either 'PUBLIC' or 'PRIVATE', defaults to 'PUBLIC'
 *
 * Timestamps are automatically added for `createdAt` and `updatedAt` fields.
 */
const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: String,
      required: true,
      trim: true,
    },
    participants: {
      type: [String],
      required: true,
      default: [],
    },
    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PUBLIC',
    },
  },
  {
    collection: 'Community',
    timestamps: true,
  },
);

export default communitySchema;
