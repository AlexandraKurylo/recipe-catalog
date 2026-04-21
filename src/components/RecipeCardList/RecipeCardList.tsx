import { memo, type FC } from "react";
import type { IRecipeCard } from "../../types/global.types";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import cls from "./RecipeCardList.module.css";

export interface IRecipeCardListProps {
  recipes: IRecipeCard[];
}

export const RecipeCardList: FC<IRecipeCardListProps> = memo(({ recipes }) => {
  return (
    <div className={cls.cardList}>
      {recipes.map((recipe, index) => {
        return <RecipeCard recipe={recipe} key={index} />;
      })}
    </div>
  );
});
