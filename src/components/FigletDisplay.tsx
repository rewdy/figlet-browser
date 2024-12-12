import figlet from "figlet";
import type React from "react";
import { useMemo, useRef } from "react";
import "./FigletDisplay.scss";
import { Copy as CopyIcon } from "react-feather";
import { useInViewport } from "react-in-viewport";
import { lolcatRender } from "../helpers/lolcat";
import { useAsImage } from "../hooks/useAsImage";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useFigletDisplay } from "../hooks/useFigletText";
import type { FontInfo } from "../hooks/useFontList";

figlet.defaults({ fontPath: "node_modules/figlet/importable-fonts" });

export type FigletDisplayProps = {
  text: string;
  font: FontInfo;
  lolcat?: boolean;
};

export const FigletDisplay: React.FC<FigletDisplayProps> = ({
  text,
  font,
  lolcat = false,
}) => {
  const figRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(figRef);
  const { copyToClipboard, message, showMessage } = useCopyToClipboard();
  const { copyAsImageToClipboard } = useAsImage();
  const display = useFigletDisplay(text, font.name, inViewport);
  const colorized = useMemo(() => {
    if (!lolcat) {
      return display;
    }
    return lolcatRender(display, { seed: 1, frequency: 0.5, spread: 10 });
  }, [display, lolcat]);

  const { name: fontName } = font;
  const displayId = `figlet-${fontName}`;

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
            <details className="dropdown figlet-copy-dropdown">
              {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
              <summary role="button" className="secondary small">
                <CopyIcon />
              </summary>
              <ul dir="rtl">
                <li>
                  {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(display);
                    }}
                  >
                    Copy text
                  </a>
                </li>
                <li>
                  {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      copyAsImageToClipboard(displayId);
                    }}
                  >
                    Copy as image
                  </a>
                </li>
              </ul>
            </details>
            {showMessage && (
              <span className="figlet-copy-message">{message}</span>
            )}
          </div>
          <div className="figlet-preview-text-wrapper">
            <pre id={displayId} className="figlet-preview-text">
              {colorized}
            </pre>
          </div>
        </div>
      ) : (
        <p className="figlet-loading">
          <span aria-busy="true">Loading your figlet text...</span>
        </p>
      )}
    </div>
  );
};
