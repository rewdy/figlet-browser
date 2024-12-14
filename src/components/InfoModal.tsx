import type React from "react";
import { Check } from "react-feather";

export type InfoModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, toggle }) => {
  return (
    <dialog open={isOpen}>
      <article>
        <header>
          <h2>What is this?</h2>
        </header>
        <p>Hi 👋</p>
        <p>
          I built this little tool because each time I wanted to use figlet for
          something, I found there wasn't a great way to find a suitable figlet
          font. There are a lot of them and it's hard to see which ones are nice
          for what you're doing. This tool provides a way to search and filter
          to find the perfect figlet for your perfect project. 🌟
        </p>
        <h3>More info</h3>
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/FIGlet">What is figlet?</a>{" "}
            (Wikipedia)
          </li>
          <li>
            <a href="https://www.google.com/search?q=How+do+I+install+figlet%3F">
              How do I install figlet?
            </a>{" "}
            (Google)
          </li>
          <li>
            {" "}
            Can I see the source code?{" "}
            <a href="https://github.com/rewdy/figlet-browser">It's on GitHub</a>{" "}
            👍
          </li>
        </ul>
        <hr />
        <p className="text-center">
          As always, made with joy by <a href="https://rewdy.lol">rewdy</a> 😂
        </p>
        <footer>
          <button
            type="button"
            title="Close"
            onClick={toggle}
            className="secondary"
            style={{ marginBottom: 0 }}
          >
            <Check /> Got it
          </button>
        </footer>
      </article>
    </dialog>
  );
};
