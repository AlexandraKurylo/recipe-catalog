import { type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import cls from "./RecipeForm.module.css";
import { recipeSchema, type RecipeFormValues } from "./recipeSchema";

interface RecipeFormProps {
  defaultValues?: Partial<RecipeFormValues>;
  onSubmit: (data: RecipeFormValues) => void;
  submitBtnText: string;
  isPending?: boolean;
}

export const RecipeForm: FC<RecipeFormProps> = ({ defaultValues, onSubmit, submitBtnText, isPending }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <div className={cls.formControl}>
        <label>Recipe Name:</label>
        <input {...register("name")} placeholder="e.g. Borsch" />
        {errors.name && <span className={cls.error}>{errors.name.message}</span>}
      </div>

      <div className={cls.formControl}>
        <label>Image URL:</label>
        <input {...register("image")} placeholder="https://example.com/image.jpg" />
        {errors.image && <span className={cls.error}>{errors.image.message}</span>}
      </div>

      <div className={cls.row}>
        <div className={cls.formControl}>
          <label>Cook Time (min):</label>
          <input type="number" {...register("cookTime", { valueAsNumber: true })} />
          {errors.cookTime && <span className={cls.error}>{errors.cookTime.message}</span>}
        </div>

        <div className={cls.formControl}>
          <label>Calories:</label>
          <input type="number" {...register("calories", { valueAsNumber: true })} />
          {errors.calories && <span className={cls.error}>{errors.calories.message}</span>}
        </div>
      </div>

      <div className={cls.row}>
        <div className={cls.formControl}>
          <label>Difficulty:</label>
          <select {...register("difficulty")}>
            <option value="" disabled hidden>
              Select difficulty
            </option>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
          {errors.difficulty && <span className={cls.error}>{errors.difficulty.message}</span>}
        </div>

        <div className={cls.formControl}>
          <label>Category:</label>
          <select {...register("category")}>
            <option value="" disabled hidden>
              Select category
            </option>
            <option value="main">Main Course</option>
            <option value="soup">Soup</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
          </select>
          {errors.category && <span className={cls.error}>{errors.category.message}</span>}
        </div>
      </div>

      <div className={cls.formControl}>
        <label>Origin (Country):</label>
        <input {...register("origin")} placeholder="e.g. Ukraine" />
        {errors.origin && <span className={cls.error}>{errors.origin.message}</span>}
      </div>

      <div className={cls.formControl}>
        <label>Original Recipe Link:</label>
        <input {...register("recipeUrl")} placeholder="https://bbcgoodfood.com/..." />
        {errors.recipeUrl && <span className={cls.error}>{errors.recipeUrl.message}</span>}
      </div>

      <Button isDisabled={isPending} type="submit">
        {submitBtnText}
      </Button>
    </form>
  );
};
