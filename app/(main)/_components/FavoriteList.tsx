"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { Id } from "@/convex/_generated/dataModel";

interface DocumentListProps {
  documentId?: Id<"documents">;
}

const FavoriteList = ({ documentId }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();

  const document = useQuery(api.documents.getFavorites);

  if (document === undefined) {
    return null;
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      {document.length > 0 && (
        <h1 className="text-xs text-muted-foreground pl-4 mb-2">Favorites</h1>
      )}

      <div className="mb-3">
        {document.map((document) => (
          <div key={document._id + "div"}>
            {!document.isArchived && (
              <div key={document._id + "fav"}>
                <Item
                  id={document._id}
                  onClick={() => onRedirect(document._id)}
                  label={document.title}
                  icon={FileIcon}
                  documentIcon={document.icon}
                  active={params.documentId === document._id}
                  favorite={document.favorite}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoriteList;
