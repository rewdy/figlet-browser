import type React from "react";
import { ThemeToggle } from "./ThemeToggle";
import "./Header.scss";
import { useBackgroundText } from "../hooks/useBackgroundText";

export const Header: React.FC = () => {
  const figletText = useBackgroundText();

  return (
    <header className="container site-header">
      <hgroup className="site-header-group">
        <div className="site-header-title">
          <h1>🖥️ Figlet Browser</h1>
          <p>Find your favorite font!</p>
        </div>
        <div className="site-header-theme">
          <p>
            <ThemeToggle />
          </p>
        </div>
        <div className="site-header-background">
          <div className="site-header-background-text">{figletText}</div>
        </div>
      </hgroup>
    </header>
  );
};
