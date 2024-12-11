import { useContext } from "react";
import { ThemeContext, type ThemeContextProps } from "../contexts/ThemeContext";

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
