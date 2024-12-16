import type React from "react";
import useLocalStorageState from "use-local-storage-state";
import useSessionStorageState from "use-session-storage-state";
import {
  DEMO_TEXT_STORAGE_KEY,
  LOLCAT_STORAGE_KEY,
  SHOW_ALL_STORAGE_KEY,
} from "../constants";
import { type FilterState, useFontList } from "../hooks/useFontList";
import { FigletDisplay } from "./FigletDisplay";
import "./FigletList.scss";
import { ElevatorLink } from "./ElevatorLink";

const TODAY_LIMIT = 25;

export const FigletList: React.FC = () => {
  const [showAll, setShowAll] = useSessionStorageState<boolean>(
    SHOW_ALL_STORAGE_KEY,
    { defaultValue: false },
  );
  const [text, setText] = useLocalStorageState<string>(DEMO_TEXT_STORAGE_KEY, {
    defaultValue: "Hello, world",
  });
  const [lolcatEnabled, setLolcatEnabled] = useLocalStorageState<boolean>(
    LOLCAT_STORAGE_KEY,
    { defaultValue: false },
  );

  const {
    fontList,
    tagList,
    maxRows,
    filters,
    setFilters,
    toggleTag,
    isFiltered,
    clearFilters,
    todaysRandom,
  } = useFontList();

  // Config defaults to use for the small / medium / large buttons
  const smallConfig: Partial<FilterState> = {
    minRows: 1,
    maxRows: 5,
  };
  const mediumConfig: Partial<FilterState> = {
    minRows: 5,
    maxRows: 12,
  };
  const largeConfig: Partial<FilterState> = {
    minRows: 12,
    maxRows: maxRows,
  };

  const fontsToShow =
    isFiltered || showAll ? fontList : todaysRandom.slice(0, TODAY_LIMIT);

  return (
    <>
      <section>
        <header>
          <h2>Set text</h2>
        </header>
        <form>
          <input
            id="preview"
            type="text"
            placeholder="Enter text to preview"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </section>
      <hr />
      <section>
        <header className="section-header">
          <div>
            <h2>Filter</h2>
          </div>
          <div>
            <p className="text-right">
              <em>Showing {fontsToShow.length} fonts</em>
              &emsp;
              <button
                type="button"
                className="secondary"
                onClick={clearFilters}
                disabled={!isFiltered}
              >
                Clear filters
              </button>
            </p>
          </div>
        </header>
        <div className="filter-blocks">
          <div className="filter-block filter-show-all">
            <fieldset>
              <input
                type="radio"
                id="show-todays-today"
                name="show-todays"
                checked={!isFiltered && !showAll}
                onClick={() => {
                  clearFilters();
                  setShowAll(false);
                }}
              />
              <label htmlFor="show-todays-today">
                Show today's 25 random fonts
              </label>
              <input
                type="radio"
                id="show-todays-all"
                name="show-todays"
                checked={!isFiltered && showAll}
                onClick={() => {
                  clearFilters();
                  setShowAll(true);
                }}
              />
              <label htmlFor="show-todays-all">Show all fonts</label>
            </fieldset>
          </div>
          <div className="filter-block filter-tags">
            {tagList.map((tag) => (
              <div key={tag} className="filter-tag">
                <label className="filter-tag-label">
                  <input
                    type="checkbox"
                    name="filter-tags"
                    value={tag}
                    checked={filters.tags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    // This is unnecessary, but react thinks this is uncontrolled if we don't have a handler here
                    onChange={() => {}}
                  />
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <div className="filter-block filter-block-height">
            <label className="filter-range">
              Max height (rows of text) <mark>{filters.maxRows}</mark>
              <input
                type="range"
                value={filters.maxRows}
                max={maxRows}
                min={1}
                step={1}
                onChange={(e) =>
                  setFilters((existing) => ({
                    ...existing,
                    maxRows: Number.parseInt(e.target.value),
                  }))
                }
              />
            </label>
            <label className="filter-range">
              Minimum height (rows of text) <mark>{filters.minRows}</mark>
              <input
                type="range"
                value={filters.minRows}
                max={maxRows}
                min={1}
                step={1}
                onChange={(e) =>
                  setFilters((existing) => ({
                    ...existing,
                    minRows: Number.parseInt(e.target.value),
                  }))
                }
              />
            </label>
            <div>
              {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
              <div role="group">
                <button
                  type="button"
                  onClick={() =>
                    setFilters((existing) => ({
                      ...existing,
                      ...smallConfig,
                    }))
                  }
                >
                  Small
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFilters((existing) => ({
                      ...existing,
                      ...mediumConfig,
                    }))
                  }
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFilters((existing) => ({
                      ...existing,
                      ...largeConfig,
                    }))
                  }
                >
                  Large
                </button>
              </div>
            </div>
          </div>
          <div className="filter-block filter-block-search">
            <label>
              Search
              <input
                type="search"
                placeholder="Filter by name"
                value={filters.textFilter}
                onChange={(e) =>
                  setFilters((existing) => ({
                    ...existing,
                    textFilter: e.target.value,
                  }))
                }
              />
            </label>
          </div>
        </div>
      </section>
      <hr />
      <section>
        <header className="section-header">
          <div>
            <h2>Figlet Fonts</h2>
          </div>
          <div className="figlet-list-toggles">
            <label>
              <input
                name="lolcat"
                type="checkbox"
                role="switch"
                checked={lolcatEnabled}
                aria-checked={lolcatEnabled}
                onClick={() => setLolcatEnabled(!lolcatEnabled)}
                // This is unnecessary, but react thinks this is uncontrolled if we don't have a handler here
                onChange={() => {}}
              />{" "}
              {lolcatEnabled ? "🌈" : "🐈"} lolcat
            </label>
          </div>
        </header>
        {text.length > 0 &&
          fontsToShow.map((font) => (
            <FigletDisplay
              key={font.name}
              text={text}
              font={font}
              lolcat={lolcatEnabled}
            />
          ))}
        {text.length === 0 && (
          <p className="text-center">
            <em>Please set text to see fonts.</em>
          </p>
        )}
        {fontsToShow.length === 0 && isFiltered && (
          <>
            <p className="text-center">
              <em>No fonts exist that match filter criteria.</em>
            </p>
            <p className="text-center">
              You can{" "}
              <button type="button" onClick={clearFilters} className="outline">
                reset filters
              </button>{" "}
              to see all fonts
            </p>
          </>
        )}
      </section>
      <ElevatorLink />
    </>
  );
};
