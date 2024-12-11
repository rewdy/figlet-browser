import figlet, { type Fonts } from "figlet";
import { useEffect, useState } from "react";

const RENDER_CACHE: Record<string, string> = {};

/**
 * Hook to render text using figlet. Results cached in memory to keep things snappy.
 *
 * @param text Test to render
 * @param font Font to use
 * @param shouldRender Whether or not to render. Used so we can optionally render based on what is in the viewport.
 * @returns Rendered string of multiline text
 */
export const useFigletDisplay = (
  text: string,
  font: Fonts,
  shouldRender = false,
) => {
  const [rendered, setRendered] = useState<string>("");
  useEffect(() => {
    const renderText = async () => {
      const cacheKey = `${font}:${text}`;
      if (cacheKey in RENDER_CACHE) {
        setRendered(RENDER_CACHE[cacheKey]);
      } else {
        const importedFont = await import(`../assets/figlets/${font}.js`);
        await figlet.parseFont(font, importedFont.default);
        await figlet.text(
          text,
          {
            font: font,
            horizontalLayout: "default",
            verticalLayout: "default",
            whitespaceBreak: true,
          },
          (error, result) => {
            if (error) {
              console.error(error);
              RENDER_CACHE[cacheKey] =
                "An error occurred while rendering the text.";
              setRendered("An error occurred while rendering the text.");
            } else if (result) {
              RENDER_CACHE[cacheKey] = result;
              setRendered(result);
            }
          },
        );
      }
    };
    if (shouldRender) {
      renderText();
    }
  }, [text, font, shouldRender]);

  return rendered;
};
