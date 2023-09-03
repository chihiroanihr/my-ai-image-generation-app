import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../database/models/post.js";

/**
 * Endpoint to create post with generated ai-image result,
 * and share it with the community.
 */

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Get all posts from database.
 */
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    // console.log(posts)

    // Send back to the client
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    // Error
    console.log("[LOG] ", error);
    res.status(500).json({ success: false, message: error });
  }
});

/**
 * 1. Upload asset (generated image) to Cloudinary.
 * 2. Create a post and store it in the database.
 */
router.route("/").post(async (req, res) => {
  try {
    // Obtain generated image info & prompt from the client
    const { name, prompt, photo } = req.body;

    // Upload asset to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create new Post and add it in database
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url, // img asset from cloudinary
    });
    // console.log(newPost); // values stored: name, prompt, photo, _id, _v

    // Send back to the client
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    // Error
    console.log("[LOG] ", error);
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
