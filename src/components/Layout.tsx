import type React from "react";
import { Header } from "./Header";
import { ThemeProvider } from "./ThemeProvider";
import "./Layout.scss";
import { GitHub } from "react-feather";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <Header />
      <main className="container">{children}</main>
      <footer className="site-footer">
        <hr />

        <p className="footer-links">
          <a href="http://www.figlet.org" target="_blank" rel="noreferrer">
            FIGlet.org
          </a>
          <a
            href="https://en.wikipedia.org/wiki/FIGlet"
            target="_blank"
            rel="noreferrer"
          >
            What is FIGlet?
          </a>
          <a
            href="https://github.com/rewdy/figlet-browser"
            target="_blank"
            rel="noreferrer"
            title="GitHub repository"
          >
            <GitHub className="svg-icon" /> GitHub Repo
          </a>
        </p>
        <p className="text-center text-small text-secondary">
          😂 Made with joy by <a href="https://rewdy.lol">rewdy</a>
        </p>
      </footer>
    </ThemeProvider>
  );
};
