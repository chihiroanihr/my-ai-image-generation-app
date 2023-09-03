import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SvgLoader, Card, FormField } from "../components";

const RenderCards = ({ data, message }) => {
  // If data exists then render data over the Card component.
  if (data?.length > 0)
    return data.map((post) => <Card key={post.id} {...post} />);

  // If no data exist
  return (
    <h2
      className={twMerge("mt-5", "text-xl font-bold uppercase text-[#6469ff]")}
    >
      {message}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null); // store reference to a timer

  /**
   * Get all the posts from database
   */
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        // Response from /routes/postRoutes.js
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);

        if (response.ok) {
          // Get the result
          const result = await response.json();
          // Store the result
          setAllPosts(result.data.reverse()); // newest post at the top
        }
      } catch (error) {
        // Error
        console.log("[LOG] ", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    // Execute Fetch Posts
    fetchPosts();
  }, []);

  /**
   * Handle value of search input changes
   * @param {String} e - event handler for an input element
   */
  const handleSearchTextChange = (e) => {
    // Clears any existing timer (only once the user has finished typing)
    clearTimeout(searchTimeout); // to ensure that multiple rapid changes to the search input do not trigger multiple search requests.

    setSearchText(e.target.value);

    // Sets a new timer using setTimeout
    setSearchTimeout(
      setTimeout(
        () => {
          // Filter results based on the search input prompts
          const searchResults = allPosts.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.prompt.toLowerCase().includes(searchText.toLowerCase()),
          );

          // Store the filtered results for display
          setSearchedResults(searchResults);
        },
        500, // delays the execution of filtering by 500 ms.
      ),
    );
  };

  return (
    <section
      className={twMerge(
        "mx-auto",
        "max-w-7xl", // max-width: 80rem = 1280px
      )}
    >
      {/* Title */}
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">
          The Community Showcase
        </h1>
        <p
          className={twMerge(
            "mt-2 max-w-[500px]",
            "text-[16px] text-[#666e75]",
          )}
        >
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI.
        </p>
      </div>

      {/* Form Field for Search Posts */}
      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchTextChange}
        />
      </div>

      {/* Results */}
      <div className="mt-10">
        {loading ? (
          // Loader
          <div className="flex items-center justify-center">
            <SvgLoader />
          </div>
        ) : (
          // Results
          <>
            {/* Search Text */}
            {searchText && (
              <h2
                className={twMerge(
                  "mb-3",
                  "text-xl font-medium text-[#666e75]",
                )}
              >
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}

            {/* Render Results(Posts) as Cards */}
            <div
              className={twMerge(
                "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
                "gap-3",
              )}
            >
              {searchText ? (
                // Display all past generated images based on Search Query
                <RenderCards
                  data={searchedResults}
                  message="No search results found"
                />
              ) : (
                // Display all past generated images
                <RenderCards data={allPosts} message="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
