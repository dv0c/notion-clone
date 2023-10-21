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
    return <>Loading</>;
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      <div className="mb-3">
        {document.map((document) => (
          <div key={document._id}>
            <Item
              id={document._id}
              onClick={() => onRedirect(document._id)}
              label={document.title}
              icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
              onExpand={() => {}}
              favorite={document.favorite}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoriteList;
