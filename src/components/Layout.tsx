import type React from "react";
import { Header } from "./Header";
import { ThemeProvider } from "./ThemeProvider";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <Header />
      <main className="container">{children}</main>
    </ThemeProvider>
  );
};
