# Setup Client

Create _**/client**_ folder</br>
While inside _**/client**_ folder...

1. Run `npm create vite latest ./` then select **React** and **JavaScript** variant in the console.

2. Run `npm install`

3. Install all required packages:

   - [**Tailwind CSS for Vite**](https://tailwindcss.com/docs/guides/vite)</br>
     `npm install -D tailwindcss postcss autoprefixer`
   - [**Prettier Plugin for Tailwind CSS**](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) [Optional]</br>
     `npm install -D prettier prettier-plugin-tailwindcss`
   - [**Tailwind Merge**](https://www.npmjs.com/package/tailwind-merge) [Optional]</br>
     `npm install tailwind-merge`
   - [**React Router DOM**](https://www.npmjs.com/package/react-router-dom)</br>
     `npm install react-router-dom`
   - [**FileSaver.js**](https://www.npmjs.com/package/file-saver)</br>
     `npm install file-saver`

4. Modify _**/assets**_ folder, create _**/constants**_ folder, modify _**index.css**_ file, and delete initial code inside _**App.jsx**_ file.

5. Initialize tailwind with:</br>
   `npx tailwindcss init -p`</br>
   --> This creates _**tailwind.config.js**_ file and _**postcss.config.js**_ file.

6. Modify _**tailwind.config.js**_ file.

7. Add the following Tailwind directives to your CSS (inside _**index.css**_):

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

8. [Optional] Install [**Prettier Plugin for Tailwind CSS** [Optional]](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)</br>
   `npm install -D prettier prettier-plugin-tailwindcss`

9. [Optional] Create _**prettier.config.js**_ file and add the following:

   ```js
   export default {
     plugins: ["prettier-plugin-tailwindcss"],
   };
   ```

10. Import all required fonts in _**index.html**_:

    ```html
    <head>
      <link rel="stylesheet" href="{{ link_to_fonts }}" />
    </head>
    ```

11. Start your build process: `npm run dev`

# Integrate Backend to Frontend (client) via API Endpoint

For example in one of your file inside _**/clients**_:

```js
const REQUEST_URL = "http://localhost:8080/api/v1/dalle";

try {
  // Response: AI-generated image
  const response = await fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: form.prompt }),
  });

  // Parse the response
  const data = await response.json();

  // If not success then throw new error
  if (response.status !== 200) {
    throw new Error("Internal Server Error.");
  }

  // Save and render image
  setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
} catch (error) {
  // Error
  console.log(error);
  alert(error);
}
```
