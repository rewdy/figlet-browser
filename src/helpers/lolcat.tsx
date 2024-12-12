import type { ReactNode } from "react";

//
// Types
//

/**
 * Lolcat Options
 */
export type LolcatOptions = {
  /**
   * Seed of the rainbow; use the same for the same pattern
   */
  seed?: number;
  /**
   * Spread of the rainbow
   */
  spread?: number;
  /**
   * Frequency of the rainbow colors
   */
  frequency?: number;
};

/**
 * RGB object
 */
type RGB = { red: number; green: number; blue: number };
/**
 * Single character and color
 */
type LolcatChar = [string, RGB];
/**
 * Single row of characters and corresponding colors
 */
type LolcatRow = Array<LolcatChar>;

/**
 * Rows of lines of characters with colors
 */
export type LolcatResult = Array<LolcatRow>;

//
// Helpers
//

/**
 * Get color function. Largely copied from lolcat js
 *
 * ref: https://github.com/robertmarsal/lolcatjs/blob/main/index.js#L27
 */
const getColor = (frequency: number, i: number) => {
  const red = Math.round(Math.sin(frequency * i + 0) * 127 + 128);
  const green = Math.round(
    Math.sin(frequency * i + (2 * Math.PI) / 3) * 127 + 128,
  );
  const blue = Math.round(
    Math.sin(frequency * i + (4 * Math.PI) / 3) * 127 + 128,
  );

  return {
    red: red,
    green: green,
    blue: blue,
  };
};

/**
 * Converts rgb values to a string we can use in CSS
 */
const rgbToCssString = (rgb: RGB): string =>
  `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;

//
// Core functions
//

/**
 * Default options
 */
const defaultOptions: Required<LolcatOptions> = {
  seed: 0,
  spread: 8.0,
  frequency: 0.3,
};

/**
 * 🐱 Core lolcat function that returns a list of rows of lines with characters and colors
 *
 * @param text String of text to colorize
 * @param options Options for colorizing the text
 * @returns List of rows of list of characters along with their RGB color value
 */
export const lolcatColorize = (
  text: string,
  options?: LolcatOptions,
): LolcatResult => {
  const opt = {
    ...defaultOptions,
    ...options,
  };
  const lines = text.split("\n");
  const result: LolcatResult = [];
  lines.forEach((line, lineIdx) => {
    result.push([]);
    line.split("").forEach((char, charIdx) => {
      const i = opt.seed + charIdx / opt.spread;
      result[lineIdx].push([char, getColor(opt.frequency, i)]);
    });
  });

  return result;
};

/**
 * Function that returns a ReactNode with characters lolcat colored! 🌈
 *
 * @param text String of text to colorize
 * @param options Options for colorizing the text
 * @returns List of rows of list of characters along with their RGB color value
 */
export const lolcatRender = (
  text: string,
  options?: LolcatOptions,
): ReactNode => {
  const colorized = lolcatColorize(text, options);
  return (
    <>
      {colorized.map((row, rowIdx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={`row-${rowIdx}`}>
          {row.map((item, itemIdx) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={`char-${itemIdx}`}
              style={{ color: rgbToCssString(item[1]) }}
            >
              {item[0]}
            </span>
          ))}
        </div>
      ))}
    </>
  );
};
