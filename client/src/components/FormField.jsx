import { twMerge } from "tailwind-merge";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      {/* --------- Label --------- */}
      <div className={twMerge("flex items-center gap-2", "mb-2")}>
        {/* Label Text */}
        <label
          htmlFor="name"
          className={twMerge("block", "text-sm font-medium text-gray-900")}
        >
          {labelName}
        </label>

        {/* Surprise Me Button */}
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className={twMerge(
              "text-xs font-semibold text-black",
              "rounded-[5px] bg-[#ECECF1] px-2 py-1",
            )}
          >
            Surprise me!
          </button>
        )}
      </div>

      {/* ------ Input Field -------*/}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className={twMerge(
          "block w-full p-3",
          "rounded-lg border border-gray-300 bg-gray-50 outline-none focus:border-[#4649ff] focus:ring-[#4649ff]",
          "text-sm text-gray-900",
        )}
      />
    </div>
  );
};

export default FormField;
