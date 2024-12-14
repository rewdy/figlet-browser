import type { Fonts } from "figlet";
import { useMemo } from "react";
import useSessionStorageState from "use-session-storage-state";
import { FILTERS_STORAGE_KEY } from "../constants";
import masterFontList from "./fontList.json";
import { getSeededRandom, todayNoTime } from "../helpers/seededRandom";

// Types
/**
 * Single figlet font info object
 */
export type FontInfo = {
  name: Fonts;
  height: number;
  tags: string[];
};

/**
 * Filter state object
 */
export type FilterState = {
  textFilter: string;
  tags: string[];
  maxRows: number;
  minRows: number;
};

const EXCLUDE_TAGS = ["broken"];
const PREPARED_FONTS: FontInfo[] = masterFontList
  .filter((font) => font.tags.some((tag) => !EXCLUDE_TAGS.includes(tag)))
  .sort((a, b) => a.name.localeCompare(b.name)) as FontInfo[];

/**
 * THE hook that returns the list of fonts and provides all filtering
 */
export const useFontList = () => {
  const maxRows = Math.max(...PREPARED_FONTS.map((font) => font.height));
  const tagList = Array.from(
    new Set(PREPARED_FONTS.flatMap((font) => font.tags))
  ).sort();

  const [filters, setFilters] = useSessionStorageState<FilterState>(
    FILTERS_STORAGE_KEY,
    {
      defaultValue: {
        textFilter: "",
        tags: [],
        maxRows: maxRows,
        minRows: 1,
      },
    }
  );

  const toggleTag = (tag: string) => {
    setFilters((existing) => {
      if (existing.tags.includes(tag)) {
        return {
          ...existing,
          tags: existing.tags.filter((t) => t !== tag),
        };
      }
      return {
        ...existing,
        tags: [...existing.tags, tag],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      textFilter: "",
      tags: [],
      maxRows: maxRows,
      minRows: 1,
    });
  };
  const isFiltered =
    filters.tags.length > 0 ||
    filters.maxRows < maxRows ||
    filters.minRows > 1 ||
    filters.textFilter.length > 0;

  const fontList: FontInfo[] = useMemo(() => {
    // We filter by textFilter OR the others.
    const filteredByText = filters.textFilter
      ? PREPARED_FONTS.filter((font) =>
          font.name.toLowerCase().includes(filters.textFilter.toLowerCase())
        )
      : PREPARED_FONTS;
    const filteredByTags =
      filters.tags.length > 0
        ? filteredByText.filter((font) =>
            filters.tags.every((tag) => font.tags.includes(tag))
          )
        : filteredByText;
    const filteredByRows = filteredByTags.filter(
      (font) => font.height <= filters.maxRows && font.height >= filters.minRows
    );
    return filteredByRows;
  }, [filters]);

  const todaysRandom: FontInfo[] = useMemo(() => {
    const todayDate = todayNoTime();
    return getSeededRandom(todayDate.valueOf(), PREPARED_FONTS);
  }, []);

  return {
    fontList: fontList as FontInfo[],
    tagList,
    toggleTag,
    maxRows,
    filters,
    setFilters,
    clearFilters,
    isFiltered,
    todaysRandom,
  };
};
