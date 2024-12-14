import type React from "react";
import { ThemeToggle } from "./ThemeToggle";
import "./Header.scss";
import { Info } from "react-feather";
import { useBackgroundText } from "../hooks/useBackgroundText";
import { useModalState } from "../hooks/useModalState";
import { InfoModal } from "./InfoModal";

export const Header: React.FC = () => {
  const figletText = useBackgroundText();
  const { isOpen, setIsOpen } = useModalState(false);

  return (
    <header className="container site-header">
      <hgroup className="site-header-group">
        <div className="site-header-title">
          <h1>🖥️ Figlet Browser</h1>
          <p>Find your favorite font!</p>
        </div>
        <div className="site-header-theme">
          <p>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="outline contrast borderless about-button"
            >
              <Info className="svg-icon" /> <span className="text">About</span>
            </button>
            <ThemeToggle />
          </p>
        </div>
        <div className="site-header-background">
          <div className="site-header-background-text">{figletText}</div>
        </div>
      </hgroup>
      <InfoModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </header>
  );
};
