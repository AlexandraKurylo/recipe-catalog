import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import cls from "./RecipePage.module.css";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { API_URL } from "../../constants/global.constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader, SmallLoader } from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import type { IRecipeCard } from "../../types/global.types";
import { BADGE_ENUM } from "../../types/global.enums";

export const RecipePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useAuth();

  const [recipe, setRecipe] = useState<IRecipeCard | null>(null);

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

  const [fetchRecipe, isLoading, error] = useFetch(async () => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    if (!response.ok) throw new Error("Recipe not found");
    const data: IRecipeCard = await response.json();
    setRecipe(data);
  });

  const [updateRecipe, isUpdating] = useFetch(async (updatedData: Partial<IRecipeCard>) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const data: IRecipeCard = await response.json();
    setRecipe(data);
  });

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return <div className={cls.errorInfo}>{error}</div>;

  const diff = recipe ? difficultyMap[recipe.difficulty] : null;
  const catLabel = recipe ? categoryLabels[recipe.category] || "Other" : "";

  return (
    <div className={cls.container}>
      {recipe && (
        <>
          <div className={cls.cardLabels}>
            {diff && <Badge variant={diff.variant}>{diff.label}</Badge>}
            <Badge>{catLabel}</Badge>
            {recipe.editDate && (
              <p className={cls.editDate}>
                Edited: {recipe.editDate}
                {isUpdating && <SmallLoader />}
              </p>
            )}
          </div>

          <h1 className={cls.cardTitle}>{recipe.name}</h1>

          <div className={cls.imageWrapper}>
            <img src={recipe.image} alt={recipe.name} className={cls.image} />
          </div>

          <div className={cls.detailsGrid}>
            <div className={cls.detailItem}>
              <span className={cls.detailLabel}>Time</span>
              <span className={cls.detailValue}>{recipe.cookTime} min</span>
            </div>
            <div className={cls.detailItem}>
              <span className={cls.detailLabel}>Calories</span>
              <span className={cls.detailValue}>{recipe.calories} kcal</span>
            </div>
            <div className={cls.detailItem}>
              <span className={cls.detailLabel}>Origin</span>
              <span className={cls.detailValue}>{recipe.origin}</span>
            </div>
          </div>

          <div className={cls.resourcesSection}>
            <label>Full Instruction:</label>
            <a href={recipe.recipeUrl} target="_blank" rel="noreferrer" className={cls.recipeLink}>
              {recipe.recipeUrl}
            </a>
          </div>

          <div className={cls.actions}>
            {isAuth && (
              <Button onClick={() => navigate(`/editrecipe/${recipe.id}`)} isDisabled={isUpdating}>
                Edit Recipe
              </Button>
            )}
            <Button onClick={() => navigate("/")} isDisabled={isUpdating}>
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
