import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/global.constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import cls from "./AddRecipePage.module.css";
import type { RecipeFormValues } from "../../components/RecipeForm/recipeSchema";

export const AddRecipePage = () => {
  const navigate = useNavigate();

  const [createRecipe, isPending] = useFetch(async (data: RecipeFormValues) => {
    const response = await fetch(`${API_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
        editDate: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    toast.success("New recipe added successfully!");
    navigate("/");
  });

  return (
    <div className="container">
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add New Recipe</h1>

      <div className={cls.formContainer}>
        <RecipeForm onSubmit={createRecipe} submitBtnText="Add Recipe" isPending={isPending} />
      </div>
    </div>
  );
};
