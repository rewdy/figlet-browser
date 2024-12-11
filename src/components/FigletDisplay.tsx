import figlet from "figlet";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./FigletDisplay.scss";
import { Copy as CopyIcon } from "react-feather";
import { useInViewport } from "react-in-viewport";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import type { FontInfo } from "../hooks/useFontList";

figlet.defaults({ fontPath: "node_modules/figlet/importable-fonts" });

export type FigletDisplayProps = {
  text: string;
  font: FontInfo;
};

const RENDER_CACHE: Record<string, string> = {};

export const FigletDisplay: React.FC<FigletDisplayProps> = ({ text, font }) => {
  const [display, setDisplay] = useState<string>("");
  const figRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(figRef);
  const { copyToClipboard, message, showMessage } = useCopyToClipboard();

  const { name: fontName } = font;
  useEffect(() => {
    const renderText = async () => {
      const cacheKey = `${fontName}:${text}`;
      if (cacheKey in RENDER_CACHE) {
        setDisplay(RENDER_CACHE[cacheKey]);
      } else {
        const importedFont = await import(`../assets/figlets/${fontName}.js`);
        await figlet.parseFont(fontName, importedFont.default);
        await figlet.text(
          text,
          {
            font: fontName,
            horizontalLayout: "default",
            verticalLayout: "default",
            whitespaceBreak: true,
          },
          (error, result) => {
            if (error) {
              console.error(error);
              RENDER_CACHE[cacheKey] =
                "An error occurred while rendering the text.";
              setDisplay("An error occurred while rendering the text.");
            } else if (result) {
              RENDER_CACHE[cacheKey] = result;
              setDisplay(result);
            }
          },
        );
      }
    };
    if (inViewport) {
      renderText();
    }
  }, [text, fontName, inViewport]);

  return (
    <div className="figlet" ref={figRef}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 className="figlet-title">{fontName}</h2>
        </div>
        <div>
          <p className="figlet-tags">
            {font.tags.map((tag) => (
              <span key={tag} className="figlet-tag">
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
      {display ? (
        <div className="figlet-preview">
          <div className="figlet-preview-copy-control">
            <button
              type="button"
              className="figlet-copy secondary"
              onClick={() => {
                copyToClipboard(display);
              }}
              title="Copy to clipboard"
            >
              <CopyIcon />
            </button>
            {showMessage && (
              <span className="figlet-copy-message">{message}</span>
            )}
          </div>
          <pre className="figlet-preview-text">{display}</pre>
        </div>
      ) : (
        <p className="figlet-loading">
          <span aria-busy="true">Loading your figlet text...</span>
        </p>
      )}
    </div>
  );
};
