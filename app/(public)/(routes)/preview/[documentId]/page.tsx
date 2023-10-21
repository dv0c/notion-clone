"use client";

import Navbar from "@/app/(marketing)/_components/Navbar";
import { Cover } from "@/components/Cover";
import { Toolbar } from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface IProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: IProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pb-40 pt-[4rem]">
        <Cover preview url={document.coverImage} />
        <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
          <Toolbar preview initialData={document} />
          <Editor
            editable={false}
            onChange={() => {}}
            initialContent={document.content}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
