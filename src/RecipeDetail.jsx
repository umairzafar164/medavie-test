import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function RecipeDetail() {
  const [data, setData] = useState();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=7874e57850ad46f3b912673b66ee819d`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="xl:flex lg:flex md:block sm:block items-start justify-start">
      {data && (
        <>
          <div
            className="bg-cover
        bg-no-repeat
        bg-center
        transition-all
        duration-300
        xl:w-2/3
        lg:w-2/3
        md:w-full
        sm:w-full
        h-96
        xl:h-screen
        lg:h-screen
        md:h-96
        sm:h-96
        bg-zinc-200"
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <div className="w-full h-full relative bg-zinc-900 bg-opacity-50">
              <div className="absolute bottom-20 left-10">
                <h1 className="text-6xl font-semibold text-white mb-3">
                  {data.title}
                </h1>
                <div className="flex items-center text-white">
                  <div className="flex items-center text-white mr-4 border-r border-white pr-4">
                    <p className="mr-3">Servings</p>
                    <p>{data.servings}</p>
                  </div>
                  <div className="flex items-center text-white mr-4 border-r border-white pr-4">
                    <p className="mr-3">Ingredients</p>
                    <p>{data.extendedIngredients.length}</p>
                  </div>
                  <div className="flex items-center text-white">
                    <p className="mr-3">Ready In Minutes</p>
                    <p>{data.readyInMinutes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="transition-all
      duration-300
      xl:w-1/3
      lg:w-1/3
      md:w-full
      sm:w-full
      xl:overflow-y-scroll
      lg:overflow-y-scroll
      xl:h-screen
      lg:h-screen
      p-6"
          >
            <h1 className="mb-4 font-semibold text-3xl">Summary</h1>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: data.summary }}
            ></p>
            <div className="flex items-center justify-start flex-wrap mb-6">
              <div className="flex items-center bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-full py-2 px-4 mr-2 mb-2">
                <h1 className="mr-4 font-semibold">Health Score</h1>
                <p>{data.healthScore}</p>
              </div>
              <div className="flex items-center bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-full py-2 px-4 mr-2 mb-2">
                <h1 className="mr-4 font-semibold">Vegetarian</h1>
                <p>{data.vegetarian ? "Yes" : "No"}</p>
              </div>
              <div className="flex items-center bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-full py-2 px-4 mr-2 mb-2">
                <h1 className="mr-4 font-semibold">Vegan</h1>
                <p>{data.vegan ? "Yes" : "No"}</p>
              </div>
              <div className="flex items-center bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-full py-2 px-4 mr-2 mb-2">
                <h1 className="mr-4 font-semibold">Dairy Free</h1>
                <p>{data.dairyFree ? "Yes" : "No"}</p>
              </div>
              <div className="flex items-center bg-green-500 hover:bg-green-600 transition-all duration-200 text-white rounded-full py-2 px-4 mr-2 mb-2">
                <h1 className="mr-4 font-semibold">Gluten Free</h1>
                <p>{data.glutenFree ? "Yes" : "No"}</p>
              </div>
            </div>
            <h1 className="mb-4 font-semibold text-3xl">Ingredients</h1>
            <div className="mb-6">
              {data.extendedIngredients.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b border-zinc-200 p-2 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <p className="mr-4 capitalize font-semibold">{item.name}</p>
                  <p className="text-right">
                    {item.measures.us.unitShort === "lb" ||
                    item.measures.us.unitShort === "cup" ||
                    item.measures.us.unitShort === "cups"
                      ? `Unit: ${item.measures.us.amount} ${item.measures.us.unitShort} OR
                          ${item.measures.metric.amount} ${item.measures.metric.unitShort}`
                      : item.measures.us.unitShort === "servings"
                      ? `${item.measures.us.amount} Servings`
                      : `${item.measures.us.amount} Unit`}
                  </p>
                </div>
              ))}
            </div>
            {data.analyzedInstructions &&
              data.analyzedInstructions.length > 0 && (
                <div>
                  <h1 className="mb-4 font-semibold text-3xl">
                    Cooking Instructions
                  </h1>
                  <div>
                    {data.analyzedInstructions[0].steps.map((item, index) => (
                      <div
                        key={index + "instruction-step"}
                        className="border-b border-zinc-200 p-2 hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <p className="mr-4">
                          {index + 1}. {item.step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};
export default RecipeDetail;
