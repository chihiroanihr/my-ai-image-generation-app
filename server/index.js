import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/connect.js"; // import ... from "./database/connect" works in React yet not in Node.js
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

const PORT = 8080;

const MONGODB_CONNECTION_URL =
  `mongodb+srv://${process.env.MONGODB_USERNAME}` +
  `:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}` +
  `.uqz6no2.mongodb.net/${
    process.env.MONGODB_DB_NAME ? process.env.MONGODB_DB_NAME : ""
  }?retryWrites=true&w=majority`;

// Pull env variables
dotenv.config();

// Init Express App
const app = express();

// Additional Middlewares
app.use(cors()); // CORS
app.use(express.json({ limit: "50mb" })); // Express setting: Only parses JSON with max req body size of 50mb.

// API Middlewares - Create API endpoints to be called from client-side.
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// Routes
app.get("/", async (req, res) => {
  res.send("Server Side.");
});

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to Database
    connectDB(MONGODB_CONNECTION_URL);

    // Open Server
    app.listen(PORT, () =>
      console.log(`Server has started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("[LOG] ", error);
  }
};

startServer();
