import type React from "react";
import useScrollOffset from "../hooks/useScrollOffset";
import { ArrowUpCircle } from "react-feather";
import "./ElevatorLink.scss";

export const ElevatorLink: React.FC = () => {
  const pageHeight = window.innerHeight;
  const offset = useScrollOffset();
  const classList = ["elevator-link", "secondary"];
  if (offset <= pageHeight) {
    classList.push("hidden");
  }
  return (
    <button
      type="button"
      className={classList.join(" ")}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      title="Scroll to top"
    >
      <ArrowUpCircle />
    </button>
  );
};
