import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/global.constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import type { IRecipeCard } from "../../types/global.types";
import cls from "./EditRecipePage.module.css";
import type { RecipeFormValues } from "../../components/RecipeForm/recipeSchema";

interface EditRecipeProps {
  initialState: IRecipeCard;
}

export const EditRecipe: FC<EditRecipeProps> = ({ initialState }) => {
  const navigate = useNavigate();

  const [removeRecipe, isRemoving] = useFetch(async () => {
    const response = await fetch(`${API_URL}/recipes/${initialState.id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete recipe");

    toast.success("Recipe deleted successfully!");
    navigate("/");
  });

  const [updateRecipe, isUpdating] = useFetch(async (data: RecipeFormValues) => {
    const response = await fetch(`${API_URL}/recipes/${initialState.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        editDate: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Failed to update recipe");

    toast.success("Recipe updated successfully!");
    navigate(`/recipe/${initialState.id}`);
  });

  const onRemoveHandler = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      removeRecipe();
    }
  };

  return (
    <>
      {(isUpdating || isRemoving) && <Loader />}

      <h1 className={cls.formTitle}>Edit Recipe</h1>

      <div className={cls.formContainer}>
        <button className={cls.removeBtn} onClick={onRemoveHandler} disabled={isUpdating || isRemoving}>
          X
        </button>

        <RecipeForm
          defaultValues={initialState}
          onSubmit={updateRecipe}
          submitBtnText="Save Changes"
          isPending={isUpdating || isRemoving}
        />
      </div>
    </>
  );
};
