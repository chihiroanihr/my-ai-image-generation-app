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

/**
 * Talk to OpenAI DALL-E API
 * (Make a call to the OpenAI DALL-E API and based on the prompt, it will return AI-generated result images.)
 */
router.route("/").post(async (req, res) => {
  try {
    // Obtain prompt from the client
    const { prompt } = req.body;

    // Generate image
    const aiResponse = await openai.createImage({
      prompt,
      n: 1, // only 1 image
      size: "1024x1024",
      response_format: "b64_json",
    });

    // Obtain the result image
    const image = aiResponse.data.data[0].b64_json; // verify via logging!

    // Send back to the client
    res.status(200).json({ photo: image });
  } catch (error) {
    // Error
    console.log(error);
    res.status(500).send(error?.response.data.error.message); // verify via logging!
  }
});

export default router;
