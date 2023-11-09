"use client";
import { maxWidth, minWidth } from "@/PublicVariables";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { LayoutDashboard, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  documentId: Id<"documents">;
}
export const Menu = ({ documentId }: IProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [font, setFont] = useState(localStorage.getItem("_EditorFont_"));

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Not moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  };

  const handleWidth = (e: any) => {
    e.preventDefault();
    if (localStorage.getItem("editorWidth") === minWidth) {
      localStorage.setItem("editorWidth", maxWidth);
      router.refresh();
    } else {
      localStorage.setItem("editorWidth", minWidth);
      router.refresh();
    }
  };

  const onFontChange = (_font: string) => {
    setFont(_font);
    localStorage.setItem("_EditorFont_", _font);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60 rounded-xl"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className="flex justify-between focus:bg-inherit dark:focus:bg-inherit"
          >
            <RadioGroup
              value={font || "default"}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="default"
                  id="default"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="default"
                  onClick={() => onFontChange("default")}
                  className="flex flex-col cursor-pointer items-center justify-between rounded-md border-1 border-muted bg-muted p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-accent dark:peer-data-[state=checked]:bg-[#333] [&:has([data-state=checked])]:border-primary"
                >
                  <h1 className="text-xl">Ag</h1>
                  <span className="text-gray-400 mt-1 text-xs">Default</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="serif"
                  id="serif"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="serif"
                  onClick={() => onFontChange("serif")}
                  className="flex flex-col cursor-pointer items-center justify-between rounded-md border-1 border-muted bg-muted p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-accent dark:peer-data-[state=checked]:bg-[#333] [&:has([data-state=checked])]:border-primary"
                >
                  <h1 className="text-xl font-serif">Ag</h1>
                  <span className="text-gray-400 mt-1 text-xs">Default</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="mono"
                  id="mono"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mono"
                  onClick={() => onFontChange("mono")}
                  className="flex flex-col cursor-pointer items-center justify-between rounded-md border-1 border-muted bg-muted p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-accent dark:peer-data-[state=checked]:bg-[#333] [&:has([data-state=checked])]:border-primary"
                >
                  <h1 className="text-xl font-mono">Ag</h1>
                  <span className="text-gray-400 mt-1 text-xs">Default</span>
                </Label>
              </div>
            </RadioGroup>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer justify-between"
            onClick={(e) => handleWidth(e)}
          >
            Full width
            <Switch
              checked={localStorage.getItem("editorWidth") === maxWidth}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="text-xs text-muted-foreground p-2">
            Last edited by: {user?.fullName}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
