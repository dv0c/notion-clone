import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  initialData: Doc<"documents">;
}

export const Favorite = ({ initialData }: IProps) => {
  const update = useMutation(api.documents.update);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAdd = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      favorite: true,
    }).finally(() => {
      setIsSubmitting(false);
      toast.promise(promise, {
        loading: "Adding note to favorites...",
        success: "Note added to favorites",
        error: "Error adding note to favorites",
      });
    });
  };

  const onRemove = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      favorite: false,
    }).finally(() => {
      setIsSubmitting(false);
      toast.promise(promise, {
        loading: "Removing note from favorites...",
        success: "Note removed from favorites",
        error: "Error removing note from favorites",
      });
    });
  };

  return (
    <div>
      {initialData.favorite === true ? (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isSubmitting}
          onClick={onRemove}
        >
          <Star className="w-4 h-4 text-muted-foreground fill-muted-foreground" />
          {initialData.favorite}
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isSubmitting}
          onClick={onAdd}
        >
          <Star className="w-4 h-4" />
          {initialData.favorite}
        </Button>
      )}
    </div>
  );
};
