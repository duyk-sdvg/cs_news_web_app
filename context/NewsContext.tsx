"use client";

import { News } from "@/types/interface";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type NewsContextValue = {
  newsList: News[];
  setNewsList: Dispatch<SetStateAction<News[]>>;
};

const NewsContext = createContext<NewsContextValue | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [newsList, setNewsList] = useState<News[]>([]);

  return (
    <NewsContext.Provider value={{ newsList, setNewsList }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx)
    throw new Error("useNews должен использоваться внутри NewsProvider");
  return ctx;
}
