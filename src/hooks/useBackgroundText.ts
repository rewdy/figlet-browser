import type { Fonts } from "figlet";
import useSessionStorageState from "use-session-storage-state";
import { HEADER_BG_FONT_STORAGE_KEY, SITE_HEADER_BG_TEXT } from "../constants";
import { useFigletDisplay } from "./useFigletText";

const FONT_OPTIONS: Fonts[] = [
  "Fraktur",
  "Broadway",
  "Crazy",
  "Caligraphy",
  "Banner3-D",
];
const getRandomFont = () => {
  const index = Math.floor(Math.random() * FONT_OPTIONS.length);
  return FONT_OPTIONS[index];
};

/**
 * Hook to pick a font and render the text for the site header background
 */
export const useBackgroundText = () => {
  const [font] = useSessionStorageState(HEADER_BG_FONT_STORAGE_KEY, {
    defaultValue: getRandomFont(),
  });
  const display = useFigletDisplay(SITE_HEADER_BG_TEXT, font, true);
  return display;
};
