import { Action, Icon, List } from "@raycast/api";
import { useCachedState, useLocalStorage } from "@raycast/utils";
import { useCallback, useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { VolumeItem } from "./types/google-books.dt";
import { bookCount } from "./utils/books";
import { BookListItem } from "./views/BookListItem";
import { CategorizedBookGrid, FlatBookGrid } from "./views/BookGrid";
import type { ViewMode } from "./views/BookGrid";

export default function SearchGoogleBooks() {
  const [showDetail, setShowDetail] = useCachedState("show-detail", true);
  const [viewMode, setViewMode] = useCachedState<ViewMode>("view-mode", "list");
  const {
    value: lastSearch,
    setValue: setLastSearch,
    isLoading: isLoadingStorage,
  } = useLocalStorage<string>("lastSearch", "");
  const {
    value: lastFilter,
    setValue: setLastFilter,
  } = useLocalStorage<string>("lastFilter", "");
  const [searchText, setSearchText] = useState<string>();
  const { items, loading } = useSearch(searchText ?? lastSearch);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const activeFilter = filter ?? lastFilter ?? "";
  const isLoading = loading || isLoadingStorage;

  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text) {
        setLastSearch(text);
      }
    },
    [setLastSearch],
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilter(value);
      setLastFilter(value);
    },
    [setLastFilter],
  );

  const categorizedItems =
    items.reduce((acc: Record<string, VolumeItem[]>, item: VolumeItem) => {
      const category = item.volumeInfo?.categories ? item.volumeInfo?.categories[0] : "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {}) ?? {};

  const filteredCategorizedItems = Object.fromEntries(
    Object.entries(categorizedItems).filter(([category]) => !activeFilter || category === activeFilter),
  );

  const totalCount = items.length;

  const gridActions = (
    <>
      {viewMode !== "list" && (
        <Action
          icon={Icon.List}
          title="View Book List"
          shortcut={{ modifiers: ["cmd", "shift"], key: "l" }}
          onAction={() => setViewMode("list")}
        />
      )}
      {viewMode !== "categorized-grid" && (
        <Action
          icon={Icon.AppWindowGrid3x3}
          title="Show Book Covers (Sorted)"
          shortcut={{ modifiers: ["cmd", "shift"], key: "g" }}
          onAction={() => setViewMode("categorized-grid")}
        />
      )}
      {viewMode !== "grid" && (
        <Action
          icon={Icon.AppWindowGrid3x3}
          title="Show Book Covers"
          shortcut={{ modifiers: ["cmd", "shift"], key: "f" }}
          onAction={() => setViewMode("grid")}
        />
      )}
    </>
  );

  if (viewMode === "categorized-grid") {
    return (
      <CategorizedBookGrid
        categorizedItems={categorizedItems}
        filteredCategorizedItems={filteredCategorizedItems}
        totalCount={totalCount}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
        gridActions={gridActions}
      />
    );
  }

  if (viewMode === "grid") {
    return (
      <FlatBookGrid
        categorizedItems={categorizedItems}
        filteredCategorizedItems={filteredCategorizedItems}
        totalCount={totalCount}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
        gridActions={gridActions}
      />
    );
  }

  return (
    <List
      throttle
      isShowingDetail={showDetail}
      searchBarPlaceholder="Search Google Books by keywords..."
      navigationTitle="Search Google Books"
      isLoading={isLoading}
      onSearchTextChange={handleSearchTextChange}
      searchText={searchText ?? lastSearch ?? ""}
      searchBarAccessory={
        <List.Dropdown tooltip="Category" value={activeFilter} onChange={handleFilterChange}>
          <List.Dropdown.Item title={`All (${totalCount})`} value="" />
          {Object.keys(categorizedItems).sort((a, b) => a.localeCompare(b)).map((category) => (
            <List.Dropdown.Item key={category} title={`${category} (${categorizedItems[category].length})`} value={category} />
          ))}
        </List.Dropdown>
      }
    >
      {Object.keys(filteredCategorizedItems).map((category, catIndex) => (
        <List.Section
          key={category}
          title={category}
          subtitle={bookCount(filteredCategorizedItems[category].length)}
        >
          {filteredCategorizedItems[category].map((item) => (
            <BookListItem
              key={item.id}
              item={item}
              catIndex={catIndex}
              showDetail={showDetail}
              setShowDetail={setShowDetail}
              gridActions={gridActions}
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
