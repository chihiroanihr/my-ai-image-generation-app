import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { FormField, SvgLoader } from "../components";
import { getRandomPrompt } from "../utils";
import { previewIcon } from "../assets";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form input value change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle surprise me button clicked
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // Handle form submit
  const handleSubmit = () => {};

  // Start generating image (call to the backend)
  const generateImage = async () => {
    // If prompt entered
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        // Response: AI-generated image
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
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
          const errorStatusText = response.statusText;
          const errorMessage = data?.error?.message;
          throw new Error(
            `${errorStatusText}${errorMessage ? ` (${errorMessage})` : ""}`,
          );
        }

        // Save and render image
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        // Error
        console.log(error);
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    }
    // If no prompt entered
    else {
      alert("Please enter a prompt.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      {/* Title */}
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">Create</h1>
        <p
          className={twMerge(
            "mt-2 max-w-[500px]",
            "text-[16px] text-[#666e75]",
          )}
        >
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community.
        </p>
      </div>

      {/* Form */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* Form Input */}
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Preview of the image Container */}
          <div
            className={twMerge(
              "relative h-64 w-64 p-3",
              "flex items-center justify-center",
              "rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500",
              "text-sm text-gray-900",
            )}
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={previewIcon}
                alt="preview"
                className="h-9/12 w-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <SvgLoader />
              </div>
            )}
          </div>
        </div>

        {/* Generate Image Button */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={twMerge(
              "w-full sm:w-auto",
              "rounded-md bg-green-700 px-5 py-2.5",
              "text-center text-sm font-medium text-white",
            )}
          >
            {generatingImg ? "Generating" : "Generate"}
          </button>
        </div>

        {/* Share with the community Button */}
        <div className="mt-10">
          <p className={twMerge("mt-2", "text-[14px] text-[#666e75]")}>
            Once you have created the image you want, you can share it with
            others in the community.
          </p>
          <button
            type="submit"
            className={twMerge(
              "mt-3 w-full sm:w-auto",
              "rounded-md bg-[#6469ff] px-5 py-2.5",
              "text-center text-sm font-medium text-white",
            )}
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
