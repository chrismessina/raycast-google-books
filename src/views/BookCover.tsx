import { Action, ActionPanel, Detail, Icon, Keyboard, showInFinder, showToast, Toast } from "@raycast/api";
import { VolumeItem } from "../types/google-books.dt";
import { getLargeCover } from "../utils/books";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

export function BookCover({ item }: { item: VolumeItem }) {
  const cover = getLargeCover(item);
  const markdown = cover ? `# ![Cover](${cover})` : `# No cover available.`;

  return (
    <Detail
      navigationTitle="Cover"
      markdown={markdown}
      actions={
        <ActionPanel>
          {cover && (
            <ActionPanel.Section>
              <Action
                icon={Icon.Download}
                title="Download Cover"
                onAction={async () => {
                  try {
                    const response = await fetch(cover);
                    const buffer = Buffer.from(await response.arrayBuffer());
                    const safeName = "cover".replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);
                    const filePath = join(homedir(), "Downloads", `${safeName}_cover.jpg`);
                    await writeFile(filePath, buffer);
                    const toast = await showToast({
                      style: Toast.Style.Success,
                      title: "Cover Downloaded Successfully",
                      message: filePath,
                    });
                    toast.primaryAction = {
                      title: "Reveal in Finder",
                      onAction: () => showInFinder(filePath),
                    };
                  } catch {
                    await showToast({
                      style: Toast.Style.Failure,
                      title: "Download Failed",
                      message: "Could not download the cover image.",
                    });
                  }
                }}
              />
              <Action.CopyToClipboard
                icon={Icon.Clipboard}
                title="Copy Cover URL"
                content={cover}
                shortcut={Keyboard.Shortcut.Common.Copy}
              />
            </ActionPanel.Section>
          )}
          <ActionPanel.Section>
            <Action.OpenInBrowser url={item.volumeInfo.infoLink} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
