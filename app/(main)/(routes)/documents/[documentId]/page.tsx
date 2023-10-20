"use client";

import { Toolbar } from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface IProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: IProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>loading...</div>;
  }

  if (document === null) {
    return <div>not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
