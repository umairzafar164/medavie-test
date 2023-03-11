import { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "./images/bg.jpg";
import FoodCard from "./FoodCard";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [offset, setOffset] = useState(0);

  // This useEffect calls the API for cuisines
  useEffect(() => {
    if (cuisine !== "") {
      handleCuisine();
    }
  }, [cuisine]);

  // This useEffect handles the pagination
  useEffect(() => {
    if (searchTerm !== "" && cuisine === "") {
      handleSearch();
    } else if (cuisine !== "") {
      handleCuisine();
    }
  }, [offset]);

  // This function sets the search input value
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0);
  };

  const handleSearch = () => {
    setCuisine("");
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=7874e57850ad46f3b912673b66ee819d&query=${searchTerm}&number=5&offset=${offset}`
      )
      .then((res) => {
        setData(res.data.results);
      });
  };

  const handleCuisine = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=7874e57850ad46f3b912673b66ee819d&cuisine=${cuisine}&number=5&offset=${offset}`
      )
      .then((res) => {
        setData(res.data.results);
      });
  };

  return (
    <div className="bg-gray-100 h-screen overflow-y-scroll">
      <div
        className="w-full h-[500px] bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full h-full bg-zinc-900 bg-opacity-60 flex items-center justify-center">
          <div>
            <h1 className="text-5xl text-white font-semibold mb-5">
              Spoonacular Search
            </h1>
            <div className="flex items-center justify-center">
              <input
                type="text"
                className="outline-none w-3/4 px-3 py-2 rounded-md mr-2"
                placeholder="Search Recipe"
                value={searchTerm}
                onChange={onSearchChange}
              ></input>
              <button
                className="outline-none w-1/4 p-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all"
                type="primary"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-start">
          <h1 className="mr-2 font-semibold text-gray-500">Cuisine</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 text-sm transition-all mr-2"
            onClick={() => {
              setCuisine("italian");
              setOffset(0);
            }}
          >
            Italian
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 text-sm transition-all mr-2"
            onClick={() => {
              setCuisine("mexican");
              setOffset(0);
            }}
          >
            Mexican
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 text-sm transition-all"
            onClick={() => {
              setCuisine("thai");
              setOffset(0);
            }}
          >
            Thai
          </button>
        </div>
        <div className="flex items-center justify-end">
          {data.length > 0 && (
            <div className="flex items-center justify-center">
              <button
                disabled={offset === 0}
                className="disabled:bg-gray-400 bg-gray-500 hover:bg-gray-600 transition-all text-white py-1 px-2 text-sm"
                onClick={() => setOffset((curr) => curr - 5)}
              >
                Previous
              </button>
              <div className="px-3 text-sm text-center">
                Page No. {offset / 5 + 1}
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-600 transition-all text-white py-1 px-2 text-sm"
                onClick={() => setOffset((curr) => curr + 5)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 py-8">
        {data.map((item) => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
