import { ActionPanel, Grid } from "@raycast/api";
import { VolumeItem } from "../types/google-books.dt";
import { bookCount, getGridCover } from "../utils/books";
import { BookActionSections } from "../actions/BookActions";

export type ViewMode = "list" | "grid" | "categorized-grid";

interface GridProps {
  categorizedItems: Record<string, VolumeItem[]>;
  filteredCategorizedItems: Record<string, VolumeItem[]>;
  totalCount: number;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  isLoading: boolean;
  gridActions: React.ReactNode;
}

function CategoryDropdown({
  categorizedItems,
  totalCount,
  filter,
  onFilterChange,
}: {
  categorizedItems: Record<string, VolumeItem[]>;
  totalCount: number;
  filter: string;
  onFilterChange: (value: string) => void;
}) {
  return (
    <Grid.Dropdown tooltip="Category" value={filter} onChange={onFilterChange}>
      <Grid.Dropdown.Item title={`All (${totalCount})`} value="" />
      {Object.keys(categorizedItems)
        .sort((a, b) => a.localeCompare(b))
        .map((category) => (
          <Grid.Dropdown.Item
            key={category}
            title={`${category} (${categorizedItems[category].length})`}
            value={category}
          />
        ))}
    </Grid.Dropdown>
  );
}

export function CategorizedBookGrid({
  categorizedItems,
  filteredCategorizedItems,
  totalCount,
  activeFilter,
  onFilterChange,
  isLoading,
  gridActions,
}: GridProps) {
  return (
    <Grid
      columns={5}
      aspectRatio="2/3"
      fit={Grid.Fit.Fill}
      navigationTitle="Book Covers (Sorted)"
      isLoading={isLoading}
      searchBarAccessory={
        <CategoryDropdown
          categorizedItems={categorizedItems}
          totalCount={totalCount}
          filter={activeFilter}
          onFilterChange={onFilterChange}
        />
      }
    >
      {Object.keys(filteredCategorizedItems).map((category) => (
        <Grid.Section key={category} title={category} subtitle={bookCount(filteredCategorizedItems[category].length)}>
          {filteredCategorizedItems[category].map((item) => (
            <Grid.Item
              key={item.id}
              content={getGridCover(item)}
              title={item.volumeInfo.title}
              subtitle={item.volumeInfo?.authors ? item.volumeInfo.authors[0] : "Various Authors"}
              actions={
                <ActionPanel>
                  <BookActionSections item={item} gridActions={gridActions} />
                </ActionPanel>
              }
            />
          ))}
        </Grid.Section>
      ))}
    </Grid>
  );
}

export function FlatBookGrid({
  categorizedItems,
  filteredCategorizedItems,
  totalCount,
  activeFilter,
  onFilterChange,
  isLoading,
  gridActions,
}: GridProps) {
  const items = Object.values(filteredCategorizedItems).flat();

  return (
    <Grid
      columns={5}
      aspectRatio="2/3"
      fit={Grid.Fit.Fill}
      navigationTitle="Book Covers"
      isLoading={isLoading}
      searchBarAccessory={
        <CategoryDropdown
          categorizedItems={categorizedItems}
          totalCount={totalCount}
          filter={activeFilter}
          onFilterChange={onFilterChange}
        />
      }
    >
      {items.map((item) => (
        <Grid.Item
          key={item.id}
          content={getGridCover(item)}
          title={item.volumeInfo.title}
          subtitle={item.volumeInfo?.authors ? item.volumeInfo.authors[0] : "Various Authors"}
          actions={
            <ActionPanel>
              <BookActionSections item={item} gridActions={gridActions} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
