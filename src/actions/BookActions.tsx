import { Action, ActionPanel, Icon, Keyboard } from "@raycast/api";
import { VolumeItem } from "../types/google-books.dt";
import { getISBN, getLargeCover } from "../utils/books";
import { BookDetail } from "../views/BookDetail";
import { BookCover } from "../views/BookCover";

export function BookActionSections({
  item,
  showDetail,
  setShowDetail,
  gridActions,
}: {
  item: VolumeItem;
  showDetail?: boolean;
  setShowDetail?: (value: boolean) => void;
  gridActions?: React.ReactNode;
}) {
  const hasCover = !!getLargeCover(item);
  const isbn = getISBN(item);
  const authors = item.volumeInfo?.authors?.join(", ");

  return (
    <>
      <ActionPanel.Section>
        <Action.OpenInBrowser url={item.volumeInfo.infoLink} />
        <Action.Push
          icon={Icon.Text}
          title="View Book Description"
          target={<BookDetail item={item} />}
        />
        {hasCover && (
          <Action.Push
            icon={Icon.Image}
            title="View Book Cover"
            target={<BookCover item={item} />}
            shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
          />
        )}
      </ActionPanel.Section>
      <ActionPanel.Section title="Copy">
        <Action.CopyToClipboard
          icon={Icon.Link}
          shortcut={Keyboard.Shortcut.Common.Copy}
          title="Copy Link"
          content={item.volumeInfo.infoLink}
        />
        {authors && (
          <Action.CopyToClipboard
            icon={Icon.Person}
            title="Copy Author"
            content={authors}
            shortcut={{ modifiers: ["cmd", "shift"], key: "a" }}
          />
        )}
        {isbn && (
          <Action.CopyToClipboard
            icon={Icon.BarCode}
            // @eslint-disable-next-line @raycast/rules/prefer-title-case
            title="Copy ISBN"
            content={isbn}
            shortcut={{ modifiers: ["cmd", "shift"], key: "i" }}
          />
        )}
      </ActionPanel.Section>
      {setShowDetail && (
        <ActionPanel.Section title="View">
          <Action
            icon={Icon.AppWindowSidebarLeft}
            title="Toggle Sidebar"
            onAction={() => setShowDetail(!showDetail)}
            shortcut={{ modifiers: ["cmd", "shift"], key: "enter" }}
          />
          {gridActions}
        </ActionPanel.Section>
      )}
      {!setShowDetail && gridActions && (
        <ActionPanel.Section title="View">{gridActions}</ActionPanel.Section>
      )}
    </>
  );
}
