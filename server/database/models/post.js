import mongoose from "mongoose";

/**
 * A model for a "Post" document in a MongoDB database.
 */

// Post Schema
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// Model of the Post Schema
const PostSchema = mongoose.model("Post", Post); // used to perform CRUD operations on "Post" documents.

export default PostSchema;
