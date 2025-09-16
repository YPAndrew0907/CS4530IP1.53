/**
 * Mongoose schema for the Community collection.
 *
 * - `participants`: an array of usernames (strings) representing users who are members of the community.
 * - `questions`: an array of ObjectIds referencing the Question collection.
 * - Timestamps store `createdAt` & `updatedAt`.
 * - `name`: Name of the community.
 * - `description`: description of the community.
 * - `admin`: the username of the admin user who created the community.
 * - `visibility`: enum [PUBLIC, PRIVATE].
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
      default: [],
    },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: 'Question',
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
