import type { Fonts } from "figlet";
import { useMemo, useState } from "react";
import masterFontList from "./fontList.json";

export type FontInfo = {
  name: Fonts;
  height: number;
  tags: string[];
};

export type FilterState = {
  textFilter: string;
  tags: string[];
  maxRows: number;
};

const EXCLUDE_TAGS = ["broken"];

export const useFontList = () => {
  const filteredFonts = masterFontList.filter((font) =>
    font.tags.some((tag) => !EXCLUDE_TAGS.includes(tag)),
  );
  const maxRows = Math.max(...filteredFonts.map((font) => font.height));
  const tagList = Array.from(
    new Set(filteredFonts.flatMap((font) => font.tags)),
  ).sort();

  const [filters, setFilters] = useState<FilterState>({
    textFilter: "",
    tags: [],
    maxRows: maxRows,
  });

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
    });
  };
  const isFiltered =
    filters.tags.length > 0 ||
    filters.maxRows < maxRows ||
    filters.textFilter.length > 0;

  const fontList = useMemo(() => {
    // We filter by textFilter OR the others.
    return filters.textFilter
      ? masterFontList.filter((font) =>
          font.name.toLowerCase().includes(filters.textFilter.toLowerCase()),
        )
      : masterFontList
          .filter(
            (font) =>
              filters.tags.length === 0 ||
              font.tags.some((tag) => filters.tags.includes(tag)),
          )
          .filter((font) => font.height <= filters.maxRows)
          .sort((a, b) => a.name.localeCompare(b.name));
  }, [filters]);

  return {
    fontList: fontList as FontInfo[],
    tagList,
    toggleTag,
    maxRows,
    filters,
    setFilters,
    clearFilters,
    isFiltered,
  };
};
