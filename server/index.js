import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const PORT = 8080;

// Pull env variables
dotenv.config();

// Init Express App
const app = express();

// Additional Middlewares
app.use(cors()); // CORS
app.use(express.json({ limit: "50mb" })); // Express setting: Only parses JSON with max req body size of 50mb.

// Routes
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

// Start Server
const startServer = async () => {
  app.listen(PORT, () =>
    console.log(`Server has started on port http://localhost:${PORT}`)
  );
};

startServer();
