import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/global.constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";
import { EditRecipe } from "./EditRecipe";
import type { IRecipeCard } from "../../types/global.types";

export const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<IRecipeCard | null>(null);

  const [fetchRecipe, isLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    if (!response.ok) throw new Error("Recipe not found");

    const data = await response.json();
    setRecipe(data);
  });

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {recipe && <EditRecipe initialState={recipe} />}
    </div>
  );
};
