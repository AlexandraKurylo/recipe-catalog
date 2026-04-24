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

  const difficultyMap: Record<string, { label: string; variant: BADGE_ENUM }> = {
    "1": { label: "Easy", variant: BADGE_ENUM.SUCCESS },
    "2": { label: "Medium", variant: BADGE_ENUM.WARNING },
    "3": { label: "Hard", variant: BADGE_ENUM.ALERT },
  };

  const categoryLabels: Record<string, string> = {
    main: "Main Dish",
    snack: "Snack",
    soup: "Soup",
    dessert: "Dessert",
  };

  const diff = difficultyMap[recipe.difficulty] || { label: "Unknown", variant: BADGE_ENUM.PRIMARY };
  const categoryLabel = categoryLabels[recipe.category] || "Other";

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge>{categoryLabel}</Badge>
        <Badge variant={diff.variant}>{diff.label}</Badge>
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
