import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Community collection.
 *
 * - `participants`: an array of ObjectIds referencing the User collection.
 * - `questions`: an array of ObjectIds referencing the Question collection.
 * - Timestamps store `createdAt` & `updatedAt`.
 * - `name`: Name of the community.
 * - `description`: description of the community.
 * - `visibility`: enum [PUBLIC, PRIVATE].
 */

const communitySchema = new Schema(
  {
    /*
<<<<<<< HEAD
    * Task 2.1 - 4 points
    * The community schema must accommodate the following fields:
    * name, description, participants, questions, visibility.
    * Make sure to include necessary validations, default values, and types.
    * May contain enums.
    */
=======
     * Task 2.1 - 4 points
     * The community schema must accommodate the following fields:
     * name, description, participants, questions, visibility.
     * Make sure to include necessary validations, default values, and types.
     * May contain enums.
     */
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
>>>>>>> 0f95291 (IP1 edits)
  },
  {
    collection: 'Community',
    timestamps: true,
  },
);

<<<<<<< HEAD
export default communitySchema;
=======
export default communitySchema;
>>>>>>> 0f95291 (IP1 edits)
