"use client";

import {
  Block,
  BlockNoteEditor,
  BlockSchema,
  PartialBlock,
  defaultBlockSchema,
  defaultProps,
} from "@blocknote/core";

import {
  BlockNoteView,
  InlineContent,
  ReactSlashMenuItem,
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";
import { Image } from "lucide-react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, editable, initialContent }: EditorProps) => {
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    onTextCursorPositionChange: (editor) => {
      // Gets the blocks currently spanned by the selection.
      const selectedBlocks: Block[] | undefined = editor.getSelection()?.blocks;
      // Converts array of blocks to set of block IDs for more efficient comparison.
      const selectedBlockIds: Set<string> = new Set<string>(
        selectedBlocks?.map((block) => block.id) || []
      );
      editor.forEachBlock((block) => {
        // If no selection is active, resets the background color of each block.
        if (selectedBlockIds.size === 0) {
          editor.updateBlock(block, {
            props: { backgroundColor: "default" },
          });

          return true;
        }

        if (
          selectedBlockIds.has(block.id) &&
          block.props.backgroundColor !== "blue"
        ) {
          // If the block is currently spanned by the selection, makes its
          // background blue if it isn't already.
          editor.updateBlock(block, {
            props: { backgroundColor: "blue" },
          });
        } else if (
          !selectedBlockIds.has(block.id) &&
          block.props.backgroundColor === "blue"
        ) {
          // If the block is not currently spanned by the selection, resets
          // its background if it's blue.
          editor.updateBlock(block, {
            props: { backgroundColor: "default" },
          });
        }

        return true;
      });
    },

    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
