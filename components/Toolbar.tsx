"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./IconPicker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextAreaAutoSize from "react-textarea-autosize";

interface IProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: IProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [value, setValue] = useState(initialData.title);
  const [isEditing, setIsEditing] = useState(false);

  const update = useMutation(api.documents.update);

  const enableInputs = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const removeIcon = useMutation(api.documents.removeIcon);

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };
  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground"
            onClick={onRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={() => {}}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] resize-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInputs}
          className={
            "pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] resize-none dark:text-[#CFCFCF]"
          }
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
