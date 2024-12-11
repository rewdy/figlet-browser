import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const DEFAULT_THEME = "light";

const defaultThemeContext: ThemeContextProps = {
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
};
export const ThemeContext =
  createContext<ThemeContextProps>(defaultThemeContext);
