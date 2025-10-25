import React from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || ""],
    queryFn: async () => {
      const respond = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      console.log("respond", respond.data.drinks);
      return respond.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request);
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "all";
    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
