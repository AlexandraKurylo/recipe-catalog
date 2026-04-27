import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import cls from "./Header.module.css";
import { AUTH_STORAGE } from "../../constants/global.constants";
import { ThemeToggler } from "../../features/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { LuCookingPot } from "react-icons/lu";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = (): void => {
    localStorage.setItem(AUTH_STORAGE, `${!isAuth}`);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <div className={cls.logo} onClick={() => navigate("/")}>
        <LuCookingPot size={32} className={cls.logoIcon} />
        <span>RecipeCatalog</span>
      </div>
      <div className={cls.headerButtons}>
        <ThemeToggler />
        {isAuth && <Button onClick={() => navigate("/addrecipe")}>Add</Button>}
        <Button onClick={loginHandler} isActive={!isAuth}>
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};
