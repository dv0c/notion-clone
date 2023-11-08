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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { LayoutDashboard, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  documentId: Id<"documents">;
}
export const Menu = ({ documentId }: IProps) => {
  const router = useRouter();
  const { user } = useUser();

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
