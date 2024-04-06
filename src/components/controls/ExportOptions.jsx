import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { toBlob, toPng, toSvg } from "html-to-image";
import useStore from "@/store";

export default function ExportOptions({ targetRef }) {
  const copyImage = async () => {
    // generate blob from DOM node using html-to-image library
    const imgBlob = await toBlob(targetRef.current, {
      pixelRatio: 2,
    });

    // Create a new ClipboardItem from the image blob
    const img = new ClipboardItem({ "image/png": imgBlob });
    navigator.clipboard.write([img]);
  };

  const copyLink = () => {
    // Get the current state using the 'useStore' hook
    const state = useStore.getState();

    // Encode the 'code' property of the state object to base-64 encoding
    const encodedCode = btoa(state.code);

    // Create a new URLSearchParams object with state parameters, including the encoded 'code'
    const queryParams = new URLSearchParams({
      ...state,
      code: encodedCode,
    }).toString();

    // Construct the URL with query parameters and copy it to the clipboard
    navigator.clipboard.writeText(`${location.href}?${queryParams}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dark">
        <DropdownMenuItem
          className="gap-2"
          onClick={() =>
            toast.promise(copyImage(), {
              loading: "Copying...",
              success: "Image copied to clipbard!",
              error: "Something went wrong!",
            })
          }
        >
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            copyLink();
            toast.success("Link copied to clipboard!");
          }}
        >
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2">
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2">
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
