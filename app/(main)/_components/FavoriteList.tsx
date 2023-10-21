"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const FavoriteList = () => {
  const documents = useQuery(api.documents.getFavorites);

  return <div></div>;
};

export default FavoriteList;
