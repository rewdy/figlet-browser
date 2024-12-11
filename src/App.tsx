import "./App.scss";
import useLocalStorageState from "use-local-storage-state";
import { FigletDisplay } from "./components/FigletDisplay";
import { Layout } from "./components/Layout";
import { useFontList } from "./hooks/useFontList";

const DEMO_TEXT_LOCAL_STORAGE_KEY = "figlet-browser-demo-text";

function App() {
  const [text, setText] = useLocalStorageState<string>(
    DEMO_TEXT_LOCAL_STORAGE_KEY,
    { defaultValue: "Hello, world" },
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
  } = useFontList();

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
                  />
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <div className="filter-block">
            <label>
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
          </div>

          <div className="filter-block">
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
        {text.length > 0 ? (
          fontList.map((font) => (
            <FigletDisplay key={font.name} text={text} font={font} />
          ))
        ) : (
          <p className="text-center">
            <em>Please set text to see fonts.</em>
          </p>
        )}
      </section>
    </Layout>
  );
}

export default App;
