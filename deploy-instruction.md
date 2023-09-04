# Deploy Server

[**Render**](https://render.com/) Cloud Application Hosting Website is used for server deployment.

1. Visit [**Render Website**](https://render.com/) and click "**Get Started**" button.

2. On top navbar, click "**New +**" button > click "**Web Service**".

3. Either "_**Connect a Repository**_" or copy & paste the link to "_**Public repository**_" input from the Github. **Make sure to set Github Repository to Public**.

4. Set "_**Name**_" for your web service node, and set all the configurations as following:

   - Region: {{anywhere}}
   - Branch: "main"
   - Root Directory: "./server" OR "server"
   - Environment: "Node"
   - Build Command: `$ yarn` OR anything else.
   - Start Command: `$ yarn start` OR `$ npm start` OR anything else (same as _**package.json**_ > "scripts")

5. Click on "**Create Web Services**" button which will start the deployment (**The deployment will fail at this point.**)

6. On left sidebar, click "**Environment** and insert all the environment values exactly same as from the _**.env**_ file, OR you can also choose to add the secret file (i.e. _**.env**_ or _**.npmrc**_ files).

7. Right below the top navbar, click "**Manual Deploy**" > "**Clear build cache & deploy**" button to re-deploy.

8. If you get the following error:

   ```bash
   MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
   ```

   then it is necessary to whitelist this server IP address in the database.

   For example in MongoDB Atlas website:

   1. On left sidebar, click "**Network Access**".

   2. You will see only current local IP address (your computer) is whitelisted. Click "**Add Addresses**" button > click "_**Allow access from anywhere**_" and save.

9. Back to Render website, right below the top navbar, click "**Manual Deploy**" > "**Clear build cache & deploy**" button to re-deploy.

# Change all local URL to the newly deployed backend URL

Change all localhost URL snipets (i.e. `http://localhost:{{port_number}}`) to deployed backend URL (i.e. from Render: `https://{{refer_to_your_render}}.onrender.com`) **ONLY FOR THOSE INSIDE _/client_ folder** (The new backend URL can be found in "**Dashboard**" from your render website).

For example:

```js
const response = await fetch(`http://localhost:${PORT_NUMBER}/api/v1/dalle`, {
   ...
});
```

to:

```js
const response = await fetch(`${SERVER_URL}/api/v1/dalle`, {
 ...
});
```

# Deploy Client

1. `npm run build` inside _**/client**_ directory to create a new build folder (_**/dist**_).

2. Deploy _**/client**_ on any services you would like (either by copy & pasting _**/dist**_ folder or referencing to Github _**/client**_ repository).
