import type { Dispatch, SetStateAction } from "react";
import type { THEME_ENUM } from "./global.enums";

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export interface IThemeContext {
  theme: THEME_ENUM;
  setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export interface IRecipeCard {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  cookTime: number;
  difficulty: string;
  category: string;
  calories: number;
  origin: string;
  recipeUrl: string;
}

export interface IRecipeCardState extends IRecipeCard {
  clearForm: boolean;
}

export interface IRecipeCardData {
  data: IRecipeCard[];
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number | null;
  items: number | null;
}
