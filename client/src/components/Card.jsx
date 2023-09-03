import { twMerge } from "tailwind-merge";

import { downloadIcon } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div
      className={twMerge(
        "group",
        "relative",
        "rounded-xl",
        "card shadow-card hover:shadow-cardhover",
      )}
    >
      {/* Image */}
      <img
        src={photo}
        alt={prompt}
        className="h-auto w-full rounded-xl object-cover"
      />

      {/* Caption Container */}
      <div
        className={twMerge(
          "absolute bottom-0 left-0 right-0 hidden",
          "m-2 max-h-[94%]",
          "flex-col group-hover:flex",
          "rounded-md bg-[#10131f] p-4",
        )}
      >
        {/* Prompt Text */}
        <p
          className={twMerge("prompt", "overflow-y-auto", "text-md text-white")}
        >
          {prompt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-2">
          {/* User Profile Info */}
          <div className="flex items-center gap-2">
            {/* User Icon (with first letter of the username) */}
            <div
              className={twMerge(
                "h-7 w-7",
                "flex items-center justify-center",
                "rounded-full bg-green-700 object-cover",
                "text-xs font-bold text-white",
              )}
            >
              {name[0]}
            </div>
            {/* User Name */}
            <p className="text-sm text-white">{name}</p>
          </div>

          {/* Download Image Button */}
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="border-none bg-transparent outline-none"
          >
            <img
              src={downloadIcon}
              alt="download"
              className="h-6 w-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
