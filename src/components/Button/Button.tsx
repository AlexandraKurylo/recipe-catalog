import { memo, type FC, type ReactNode, type MouseEvent } from "react";
import cls from "./Button.module.css";

export interface IButtonProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButtonProps> = memo(({ onClick, isActive, isDisabled = false, children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
});
