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

5. Setup base of server application by creating _**index.js**_ file.

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
