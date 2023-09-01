import { twMerge } from "tailwind-merge";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { logo } from "./assets";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <header
        className={twMerge(
          "flex items-center justify-between",
          "w-full bg-white px-4 py-4 sm:px-8",
          "border-b border-b-[#e6ebf4]",
        )}
      >
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        {/* Create Post Button */}
        <Link
          to="/create-post"
          className={twMerge(
            "font-iter font-medium text-white",
            "rounded-md bg-[#6469ff] px-4 py-2",
          )}
        >
          Create
        </Link>
      </header>

      {/* Main Content */}
      <main
        className={twMerge(
          "min-h-[calc(100vh-73px)]", // {screen height} - {navbar height}
          "w-full bg-[#f9fafe] px-4 py-8 sm:p-8",
        )}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
