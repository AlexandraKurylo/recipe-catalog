import { memo, type FC, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from "react";
import cls from "./Button.module.css";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButtonProps> = memo(({ onClick, isActive, isDisabled = false, type = "button", children, ...rest }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled} type={type} {...rest}>
      {children}
    </button>
  );
});
