# Setup Client

Create _**/client**_ folder</br>
While inside _**/client**_ folder...

1. Run `npm create vite latest ./` then select **React** and **JavaScript** variant in the console.

2. Run `npm install`

3. Install all required packages:

   - [**Tailwind CSS for Vite**](https://tailwindcss.com/docs/guides/vite)</br>
     `npm install -D tailwindcss postcss autoprefixer`
   - [**Tailwind Merge** [Optional]](https://www.npmjs.com/package/tailwind-merge)</br>
     `npm install tailwind-merge`
   - [**React Router DOM**](https://www.npmjs.com/package/react-router-dom)</br>
     `npm install react-router-dom`
   - [**FileSaver.js**](https://www.npmjs.com/package/file-saver)</br>
     `npm install file-saver`

</br>

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
