import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { VolumeItem } from "../types/google-books.dt";
import {
  formatPrice,
  getISBN,
  getMaskedImage,
} from "../utils/books";
import { BookActionSections } from "../actions/BookActions";

export function BookListItem({
  item,
  catIndex,
  showDetail,
  setShowDetail,
  gridActions,
}: {
  item: VolumeItem;
  catIndex: number;
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  gridActions?: React.ReactNode;
}) {
  const price = formatPrice(item);
  const isbn = getISBN(item);
  const vi = item.volumeInfo;

  return (
    <List.Item
      key={item.id}
      icon={getMaskedImage(item, catIndex)}
      title={vi?.title ?? "Untitled"}
      subtitle={showDetail ? "" : (vi?.authors ? vi.authors[0] : "Various Authors")}
      accessories={showDetail ? [] : [
        { icon: Icon.Star, text: vi?.averageRating ? `${vi.averageRating}/5` : undefined },
        { icon: Icon.Document, text: vi?.pageCount ? `${vi.pageCount}p` : undefined },
      ]}
      detail={
        <List.Item.Detail
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label
                title="Type"
                text={vi?.printType ?? "Book"}
                icon={Icon.Book}
              />
              {vi?.authors && (
                <List.Item.Detail.Metadata.Label
                  title="Author"
                  text={vi.authors.join(", ")}
                  icon={Icon.Person}
                />
              )}
              {vi?.publisher && (
                <List.Item.Detail.Metadata.Label
                  title="Publisher"
                  text={vi.publisher}
                />
              )}
              {vi?.publishedDate && (
                <List.Item.Detail.Metadata.Label
                  title="Published"
                  text={vi.publishedDate}
                  icon={Icon.Calendar}
                />
              )}
              <List.Item.Detail.Metadata.Separator />
              {vi?.pageCount && (
                <List.Item.Detail.Metadata.Label
                  title="Pages"
                  text={vi.pageCount.toString()}
                  icon={Icon.Document}
                />
              )}
              {vi?.averageRating && (
                <List.Item.Detail.Metadata.Label
                  title="Rating"
                  text={`${vi.averageRating}/5${vi.ratingsCount ? ` (${vi.ratingsCount} ratings)` : ""}`}
                  icon={Icon.Star}
                />
              )}
              {vi?.language && (
                <List.Item.Detail.Metadata.Label
                  title="Language"
                  text={vi.language.toUpperCase()}
                  icon={Icon.Globe}
                />
              )}
              {vi?.maturityRating && vi.maturityRating !== "NOT_MATURE" && (
                <List.Item.Detail.Metadata.Label
                  title="Maturity"
                  text={vi.maturityRating}
                />
              )}
              <List.Item.Detail.Metadata.Separator />
              {price && (
                <List.Item.Detail.Metadata.Label
                  title="Price"
                  text={price}
                  icon={Icon.BankNote}
                />
              )}
              {item.saleInfo?.isEbook !== undefined && (
                <List.Item.Detail.Metadata.Label
                  title="eBook"
                  text={item.saleInfo.isEbook ? "Yes" : "No"}
                  icon={Icon.Monitor}
                />
              )}
              {isbn && (
                <List.Item.Detail.Metadata.Label
                  title="ISBN"
                  text={isbn}
                  icon={Icon.BarCode}
                />
              )}
              {vi?.categories && vi.categories.length > 0 && (
                <List.Item.Detail.Metadata.TagList title="Categories">
                  {vi.categories.map((cat) => (
                    <List.Item.Detail.Metadata.TagList.Item
                      key={cat}
                      text={cat}
                      color={Color.Blue}
                    />
                  ))}
                </List.Item.Detail.Metadata.TagList>
              )}
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Link
                title="Google Books"
                text="Open"
                target={vi?.infoLink ?? ""}
              />
              {item.saleInfo?.buyLink && (
                <List.Item.Detail.Metadata.Link
                  title="Buy"
                  text="Purchase"
                  target={item.saleInfo.buyLink}
                />
              )}
            </List.Item.Detail.Metadata>
          }
        />
      }
      actions={
        <ActionPanel>
          <BookActionSections
            item={item}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            gridActions={gridActions}
          />
        </ActionPanel>
      }
    />
  );
}
