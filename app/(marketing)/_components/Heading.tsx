"use client";

import { Spinner } from "@/components/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl hidden sm:text-5xl md:text-6xl font-bold md:flex gap-3 flex-wrap justify-center items-center whitespace-nowrap">
        Your
        <img
          src="https://www.notion.so/cdn-cgi/image/format=webp,width=256,quality=90/front-static/shared/icons/wikis-icon.png"
          alt="wiki"
          className="h-12 w-12"
        />
        <span className="underline">wiki,</span>
        <img
          src="https://www.notion.so/cdn-cgi/image/format=webp,width=256,quality=90/front-static/shared/icons/docs-icon.png"
          className="h-12 w-12"
          alt="docs"
        />
        <span className="underline">docs</span>, &
        <img
          src="https://www.notion.so/cdn-cgi/image/format=webp,width=256,quality=90/front-static/shared/icons/projects-icon.png"
          alt="projects"
          className="h-12 w-12"
        />
        <span className="flex gap-1">
          <span className="underline">projects </span>. Together.
        </span>
      </h1>
      <h1 className="md:hidden text-3xl sm:text-5xl md:text-6xl font-bold">
        Your wiki, docs, & projects. Together.
      </h1>
      <h3 className="text-xl sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Link href="/documents" className={buttonVariants()}>
          Enter Notion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
