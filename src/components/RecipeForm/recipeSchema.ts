import { z } from "zod";

const DIFFICULTY_LEVELS = ["1", "2", "3"] as const;

export const recipeSchema = z.object({
  name: z.string().min(2, "Назва надто коротка").max(50, "Назва надто довга"),
  image: z.string().url("Введіть коректний URL зображення"),

  cookTime: z.number({ message: "Вкажіть час у хвилинах" }).min(1, "Час має бути більше 0").max(480),

  difficulty: z.enum(DIFFICULTY_LEVELS, { message: "Оберіть складність" }),

  calories: z.number({ message: "Калорії мають бути числом" }).min(1, "Калорії повинні бути більше 0"),

  origin: z.string().min(2, "Вкажіть країну походження"),
  recipeUrl: z.string().url("Введіть коректне посилання на рецепт"),
  category: z.string().min(1, "Оберіть категорію"),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
