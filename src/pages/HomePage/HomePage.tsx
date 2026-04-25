import { useState, useEffect, useMemo, useRef, type ChangeEvent, type MouseEvent } from "react";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import type { IRecipeCard } from "../../types/global.types";
import { RecipeCardList } from "../../components/RecipeCardList";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState<string>(`?page=1&limit=${DEFAULT_PER_PAGE}`);
  const [recipes, setRecipes] = useState<IRecipeCard[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortSelectValue, setSortSelectValue] = useState<string>("");
  const [countSelectValue, setCountSelectValue] = useState<string>(String(DEFAULT_PER_PAGE));
  const [categoryValue, setCategoryValue] = useState<string>("");

  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  const [fetchData, isLoading, error] = useFetch(async (params: string) => {
    const response = await fetch(`${API_URL}/recipes${params}`);
    if (!response.ok) throw new Error("Помилка при отриманні рецептів");
    const data = await response.json();
    const totalUrl = categoryValue ? `${API_URL}/recipes?category=${categoryValue}` : `${API_URL}/recipes`;
    const totalRes = await fetch(totalUrl);
    const totalData = await totalRes.json();
    setTotalCount(totalData.length);
    setRecipes(data);
    return data;
  });

  const filteredRecipes = useMemo(() => {
    if (recipes.length > 0) {
      const term = searchValue.trim().toLowerCase();
      if (term) {
        return recipes.filter((r) => r.name.toLowerCase().includes(term));
      }
      return recipes;
    }
    return [];
  }, [recipes, searchValue]);

  const pagination = useMemo(() => {
    const pagesCount = Math.ceil(totalCount / Number(countSelectValue));
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }, [totalCount, countSelectValue]);

  useEffect(() => {
    fetchData(searchParams);
  }, [searchParams]);

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const onCategorySelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const category = e.target.value;
    setCategoryValue(category);
    setSearchParams(
      `?page=1&limit=${countSelectValue}${sortSelectValue ? `&${sortSelectValue}` : ""}${
        category ? `&category=${category}` : ""
      }`,
    );
  };

  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const sortVal = e.target.value;
    setSortSelectValue(sortVal);
    setSearchParams(
      `?page=1&limit=${countSelectValue}${sortVal ? `&${sortVal}` : ""}${categoryValue ? `&category=${categoryValue}` : ""}`,
    );
  };

  const onCountSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const limit = e.target.value;
    setCountSelectValue(limit);
    setSearchParams(
      `?page=1&limit=${limit}${sortSelectValue ? `&${sortSelectValue}` : ""}${categoryValue ? `&category=${categoryValue}` : ""}`,
    );
  };

  const paginationHandler = (e: MouseEvent<HTMLDivElement>): void => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.tagName === "BUTTON") {
      const pageNum = targetElement.textContent;
      setSearchParams(
        `?page=${pageNum}&limit=${countSelectValue}${sortSelectValue ? `&${sortSelectValue}` : ""}${categoryValue ? `&category=${categoryValue}` : ""}`,
      );
      controlsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activePage = new URLSearchParams(searchParams).get("page") || "1";

  return (
    <div className={cls.container}>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={categoryValue} onChange={onCategorySelectChangeHandler} className={cls.select}>
          <option value="" disabled hidden>
            Select category
          </option>
          <option value="">all categories</option>
          <option value="main">main dishes</option>
          <option value="snack">snacks</option>
          <option value="soup">soups</option>
          <option value="dessert">desserts</option>
        </select>

        <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
          <option value="" disabled hidden>
            Sort by
          </option>
          <option value="">default</option>
          <option value="sortBy=difficulty&order=asc">difficulty | ASC</option>
          <option value="sortBy=difficulty&order=desc">difficulty | DESC</option>
        </select>

        <select value={countSelectValue} onChange={onCountSelectChangeHandler} className={cls.select}>
          <option disabled value="">
            count
          </option>
          <hr />
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p className={cls.errorInfo}>{error}</p>}

      {!isLoading && !error && (
        <>
          <RecipeCardList recipes={filteredRecipes} />
          {pagination.length > 1 && (
            <div className={cls.paginationContainer} onClick={paginationHandler}>
              {pagination.map((value) => (
                <Button key={value} isActive={String(value) === activePage}>
                  {value}
                </Button>
              ))}
            </div>
          )}

          {filteredRecipes.length === 0 && <p className={cls.noCardsInfo}>No recipes found...</p>}
        </>
      )}
    </div>
  );
};
