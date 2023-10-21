"use client";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DocumentList } from "./DocumentList";

export const FavoriteList = () => {
  const documents = useQuery(api.documents.getFavorites);
  const params = useParams();
  const router = useRouter();

  if (documents === undefined) {
    return <>Loading</>;
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      <p
        style={{
          paddingLeft: "25px",
        }}
        className={cn("hidden text-sm font-medium text-muted-foreground/80")}
      >
        No pages inside
      </p>
      <div>
        <Item
          id={document._id}
          onClick={() => onRedirect(document._id)}
          label={document.title}
          icon={FileIcon}
          documentIcon={document.icon}
          active={params.documentId === document._id}
          onExpand={() => {}}
        />
        <DocumentList parentDocumentId={document._id} level={level + 1} />
      </div>
    </>
  );
};
