import { Schema } from 'mongoose';
/**
 * Mongoose schema for the Collection collection.
 *
 * This schema defines the structure for storing collections in the database.
 * Each collection includes the following fields:
 * - `name`: The name of the collection.
 * - `description`: The description of the collection.
 * - `questions`: The questions that have been added to the collection.
 * - `username`: The user that created the collection.
 * - `isPrivate`: Whether the collection is private.
 */
const collectionSchema: Schema = new Schema(
  {
    /**
     * Task 1.1 - 4 points
     * The collection schema must accommodate the following fields:
     * name, description, questions, userId, isPrivate.
     * Make sure to include necessary validations, default values, and types.
     */
    // - Write your code here -
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    username: {
      type: String,
      required: true,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  { collection: 'Collection' },
);

export default collectionSchema;
