import { memo, type FC } from "react";
import type { IRecipeCard } from "../../types/global.types";
import { useNavigate } from "react-router-dom";
import { BADGE_ENUM } from "../../types/global.enums";
import { Button } from "../Button";
import cls from "./RecipeCard.module.css";
import { Badge } from "../Badge";

export interface IRecipeCardProps {
  recipe: IRecipeCard;
}

export const RecipeCard: FC<IRecipeCardProps> = memo(({ recipe }) => {
  const navigate = useNavigate();
  const levelVariant =
    recipe.difficulty === "Easy" ? BADGE_ENUM.SUCCESS : recipe.difficulty === "Medium" ? BADGE_ENUM.WARNING : BADGE_ENUM.ALERT;

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>{recipe.difficulty}</Badge>
      </div>

      <div className={cls.imageContainer}>
        <img src={recipe.image} alt={recipe.name} className={cls.image} />
      </div>

      <h5 className={cls.cardTitle}>{recipe.name}</h5>

      <div className={cls.actions}>
        <Button onClick={() => navigate(`/recipe/${recipe.id}`)}>View more</Button>
      </div>
    </div>
  );
});
