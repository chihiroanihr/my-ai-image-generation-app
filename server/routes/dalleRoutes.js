import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

/**
 * Endpoint to generate the (image) data from the OpenAI DALL-E API.
 */

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E");
});

export default router;
