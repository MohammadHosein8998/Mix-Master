import React from "react";
import Wrapper from "../assets/wrappers/CocktailList";
import CockTailCard from "./Cocktailcard"
const CocktailList = ({ drinks }) => {
  console.log("err :", !drinks || !Array.isArray(drinks));
  if (!drinks || !Array.isArray(drinks)) {
    return (
      <h4 style={{ textAlign: "center" }}>no matching cocktail found ...</h4>
    );
  }

  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return <Wrapper>
    {formattedDrinks.map((item)=>{
        return <CockTailCard key={item.id} {...item} />;
    })}
  </Wrapper>;
};

export default CocktailList;
