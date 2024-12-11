import { Expand } from "@theme-toggles/react";
import type React from "react";
import { useTheme } from "../hooks/useTheme";
import "@theme-toggles/react/css/Expand.css";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isToggled = theme === "dark";
  return (
    <Expand
      duration={750}
      toggled={isToggled}
      toggle={toggleTheme}
      placeholder={theme}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
  );
};
