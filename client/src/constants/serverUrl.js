const PORT = 8080;

export const SERVER_URL =
  import.meta.env.MODE === "development"
    ? `http://localhost:${PORT}`
    : "https://dall-e-0vef.onrender.com";
