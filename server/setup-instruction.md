# Setup Server

Create _**/server**_ folder</br>
While inside _**/server**_ folder...

1. Run `npm init -y` to create and initialize _**package.json**_ file.

2. Change _scripts_ value inside _**package.json**_ as following:

   ```json
   "scripts": {
       "start": "nodemon index"
     },
   ```

3. Install all required packages:

   - [**Nodemon**](https://www.npmjs.com/package/nodemon)</br>
     `npm install nodemon` OR `npm install -g nodemon`
   - [**Express**](https://www.npmjs.com/package/express): Web framework for Node.js</br>
     `npm install express`
   - [**dotenv**](https://www.npmjs.com/package/dotenv): Loads environment variables</br>
     `npm install dotenv`
   - [**CORS**](https://www.npmjs.com/package/cors): Handles cross origin request</br>
     `npm install cors`
   - [**Cloudinary**](https://www.npmjs.com/package/cloudinary): Media management (Image and Video API Platform)</br>
     `npm install cloudinary`
   - [**Mongoose**](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool for Node.js</br>
     `npm install mongoose`
   - [**OpenAI Node API Library**](https://www.npmjs.com/package/openai): Provides access to the OpenAI REST API</br>
     `npm install openai`

4. Since we will be working with modules (ES6+ Imports & Exports). To enable it, add the following key-value pair inside _**package.json**_:

   ```json
   {
    ...
    "description": "..."
    "type": "module" // <- Add this
    // This will allow us to use same import & export statements as in React.
    ...
   }
   ```

5. Setup base of server application by creating _**index.js**_ file:

   ```js
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
   app.use(express.json({ limit: "50mb" }));

   // Routes
   app.get("/", async (req, res) => {
     res.send("Hello World!");
   });

   // Start Server
   const startServer = async () => {
     app.listen(PORT, () =>
       console.log(`Server has started on port http://localhost:${PORT}`)
     );
   };

   startServer();
   ```

6. Start your server: `npm start`

7. Open http://localhost:{#PORT} on browser to check server running.

# Setup MongoDB

1. Go to [MongoDB Website](https://mongodb.com) and click on **Try Free** --> Register Account.

2. Create Cluster

3. Check the following tabs in "**SEQURITY**" inside left sidebar to verify information added are correct.

   - "_**Quickstart**_": Verify database authentication method, username, and password.
   - "_**Database Access**_": Verify database users (yourself as admin) are added.
   - "_**Network Access**_": Verify your current IP address that are added.

4. Go to "**OVERVIEW**" and click on **CONNECT** button in the main page. Then, click on **Drivers** under "**Connect to your application**" label.

5. Copy the string provided under "**3. Add your connection string into your application code**". Paste the string inside _**.env**_ file and replace `<password>` with your own password:

   ```
   MONGODB_CONNECTION_URL="mongodb+srv://{username}:<password>@cluster0.{...}.mongodb.net/?retryWrites=true&w=majority"
   ```

# Connect MongoDB with your application

1. Create folder _**/database**_. Inside the folder, create _**connect.js**_ file which will contain a function that connects the application to the database:

   ```js
   import mongoose from "mongoose";

   const connectDB = (url) => {
     mongoose.set("strictQuery", true);

     // Connect
     mongoose
       .connect(url)
       .then(() => console.log("MongoDB connected."))
       .catch((err) => console.log(err));
   };

   export default connectDB;
   ```

2. Import _**/database/connect.js**_ in _**index.js**_:

   ```js
   import connectDB from "./database/connect.js";
   ```

3. Modify _**startServer()**_ function inside _**index.js**_ and call _**connectDB()**_ function:

   ```js
   // Start Server
   const startServer = async () => {
     try {
       // Connect to Database
       connectDB(process.env.MONGODB_CONNECTION_URL);

       // Open Server
       app.listen(PORT, () =>
         console.log(`Server has started on port http://localhost:${PORT}`)
       );
     } catch (error) {
       console.log(error);
     }
   };
   ```

4. Make sure to re-start your server via `npm start` and verify that MongoDB is connected.

# Create Model

1. Create another folder _**/models**_ inside _**/database**_ folder. Then create any files inside _**/database/models**_ which will serve as a model for the created document in the MongoDB database.</br></br>
   For example (_**/database/models/post.js**_):

   ```js
   import mongoose from "mongoose";

   // Post Schema
   const Post = new mongoose.Schema({
     name: { type: String, required: true },
     prompt: { type: String, required: true },
     photo: { type: String, required: true },
   });

   // Model of the Post Schema
   const PostSchema = mongoose.model("Post", Post);

   export default PostSchema;
   ```

# Create Routes: API Endpoints

1. Create _**/routes**_ folder. Then create any files inside _**/routes**_ which will serve as API Routes which will be accessible from client-side.</br></br>
   For example (_**/routes/dalleRoutes.js**_):

   ```js
   import express from "express";
   import * as dotenv from "dotenv";
   import { OpenAI } from "openai";

   dotenv.config();

   const router = express.Router();

   ...

   router.route("/").get((req, res) => {
     res.send("Hello from DALL-E");
   });

   ...

   export default router;
   ```

2. Import _**/routes/{any_file}.js**_ in _**index.js**_:

   ```js
   import dalleRoutes from "./routes/dalleRoutes.js";
   ```

3. Add all created routes as API endpoints in a middleware, which will be used to call from client-side:

   ```js
   // API Middlewares
   app.use("/api/v1/dalle", dalleRoutes);
   ...
   ```

4. Make sure to re-start your server via `npm start` and enter http://localhost:8080/api/v1/dalle or any URI to the API endpoint in order to verify that API is successfully called from client-side.

# Setup OpenAI API

1. Go to [OpenAI Website](https://openai.com/) and Click **API** on the top navbar > Click **Get Started** button.

2. Login to the OpenAI account. You will be redirected to OpenAI Dashboard after login.

3. Click on your account icon on the top-right navbar > Click "**View API Keys**".

4. Click "**+ Create new secret key**" button to generate new API key.

5. Copy the API key generated and store it in _**.env**_ folder:

   ```
     OPENAI_API_KEY="{your api key}"
   ```

6. Make sure to re-start your server: `npm start`

# Use OpenAI API

### IMPORTANT:

Make sure to add **Credit Balance** to be able to use OpenAI API.<br/>Refer to [**OpenAI Pricing**](https://openai.com/pricing)

1. Paste following example code in your desired file.</br></br>
   For example (_**/routes/dalleRoutes.js**_):

   ```js
   import express from "express";
   import * as dotenv from "dotenv";
   import OpenAI from "openai";

   dotenv.config();

   const router = express.Router();

   // Register OpenAI API Key
   const openai = new OpenAI({
     apiKey: process.env.OPEN_API_KEY,
   });

   // Talk to OpenAI DALL-E API
   router.route("/").post(async (req, res) => {
     try {
       // Obtain prompt from the client
       const { prompt } = req.body;

       // Generate image
       const aiResponse = await openai.images.generate({
         prompt,
         n: 1, // only 1 image
         size: "1024x1024",
         response_format: "b64_json",
       });

       // Obtain the result image
       const image = aiResponse.data[0].b64_json;

       // Send back to the client
       res.status(200).json({ photo: image });
     } catch (error) {
       // Error
       console.log("[LOG] ", error);
       res.status(500).send(error);
     }
   });

   export default router;
   ```

2. Start the server: `npm start`
