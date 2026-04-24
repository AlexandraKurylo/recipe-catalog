import { z } from "zod";

const DIFFICULTY_LEVELS = ["1", "2", "3"] as const;
const CATEGORIES = ["main", "soup", "snack", "dessert"] as const;

export const recipeSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  image: z.string().url("Please enter a valid image URL"),

  cookTime: z.number({ message: "Enter cook time in minutes" }).min(1, "Time must be greater than 0").max(480),

  difficulty: z.enum(DIFFICULTY_LEVELS, {
    error: () => ({ message: "Please select difficulty" }),
  }),

  calories: z.number({ message: "Calories must be a number" }).min(1, "Calories must be greater than 0"),

  origin: z.string().min(2, "Enter country of origin"),
  recipeUrl: z.string().url("Please enter a valid recipe URL"),

  category: z.enum(CATEGORIES, {
    error: () => ({ message: "Please select a category" }),
  }),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
