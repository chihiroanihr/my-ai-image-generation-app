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

</br>

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

</br>

4. Go to "**OVERVIEW**" and click on **CONNECT** button in the main page. Then, click on **Drivers** under "**Connect to your application**" label.

5. Copy the string provided under "**3. Add your connection string into your application code**". Paste the string inside _**.env**_ file and replace `<password>` with your own password:

   ```json
   MONGODB_CONNECTION_URL="mongodb+srv://chihiroanihr:<password>@cluster0.{...}.mongodb.net/?retryWrites=true&w=majority"
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
