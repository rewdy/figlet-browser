import type React from "react";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { type Theme, ThemeContext } from "../contexts/ThemeContext";

const DEFAULT_THEME = "light";
const THEME_LOCAL_STORAGE_KEY = "figlet-browser-theme";

/**
 * ThemeProvider saves and sets the preferred theme for the site
 */
export const ThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const htmlTag = document.querySelector("html") as HTMLHtmlElement;
  const systemPreferredTheme = usePrefersColorScheme();
  const defaultTheme: Theme =
    systemPreferredTheme !== "no-preference"
      ? systemPreferredTheme
      : DEFAULT_THEME;
  const [selectedTheme, setSelectedTheme] = useLocalStorageState<Theme>(
    THEME_LOCAL_STORAGE_KEY,
    undefined,
  );
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const toggleTheme = () => {
    setSelectedTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const setDataThemeAttribute = (theme: Theme) => {
      htmlTag.setAttribute("data-theme", theme);
    };

    if (selectedTheme) {
      setDataThemeAttribute(selectedTheme);
      setTheme(selectedTheme);
    } else {
      setDataThemeAttribute(defaultTheme);
      setTheme(defaultTheme);
    }
  }, [defaultTheme, htmlTag, selectedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
