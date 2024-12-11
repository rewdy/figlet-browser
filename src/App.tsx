import "./App.scss";
import useLocalStorageState from "use-local-storage-state";
import { FigletDisplay } from "./components/FigletDisplay";
import { Layout } from "./components/Layout";
import { DEMO_TEXT_STORAGE_KEY } from "./constants";
import { type FilterState, useFontList } from "./hooks/useFontList";

function App() {
  const [text, setText] = useLocalStorageState<string>(DEMO_TEXT_STORAGE_KEY, {
    defaultValue: "Hello, world",
  });
  const {
    fontList,
    tagList,
    maxRows,
    filters,
    setFilters,
    toggleTag,
    isFiltered,
    clearFilters,
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

  return (
    <Layout>
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
        <header className="filter-header">
          <div>
            <h2>Filter</h2>
          </div>
          <div>
            <p className="text-right">
              <em>Showing {fontList.length} fonts</em>
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
        <header>
          <h2>Figlet Fonts</h2>
        </header>
        {text.length > 0 &&
          fontList.map((font) => (
            <FigletDisplay key={font.name} text={text} font={font} />
          ))}
        {text.length === 0 && (
          <p className="text-center">
            <em>Please set text to see fonts.</em>
          </p>
        )}
        {fontList.length === 0 && isFiltered && (
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
    </Layout>
  );
}

export default App;
