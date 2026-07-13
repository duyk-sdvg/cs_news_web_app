"use client";

import { Request_news_NEWSAPI } from "@/api/request_api";
import { ScrollToTopButton } from "@/components/pageComponents/ScrollToTopButton";
import { useNews } from "@/context/NewsContext";
import { News } from "@/types/interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NewsPage() {
  // const [newsList, setNewsList] = useState<News[]>([])
  const { newsList, setNewsList } = useNews();
  const [numberPage, setNumberPage] = useState(1);
  const hasFetchedInitial = useRef(false);
  const [isLoad, setIsLoad] = useState(true)
  const [hasMore, setHasMore] = useState(0)
  

  const loadMore = async () => {
    setHasMore(prev=>prev-5)
    setIsLoad(false)
    const newArticles = await Request_news_NEWSAPI(numberPage);
    // console.log(newArticles)
    setNewsList((prev) => [...prev, ...newArticles.articles]);
    setNumberPage((prev) => prev + 1);
    setIsLoad(true)
  };

  useEffect(() => {
    setIsLoad(false)
    if (hasFetchedInitial.current){
      setIsLoad(true)
      return
    }  ; // защита от повторного вызова
    hasFetchedInitial.current = true;

    const fetchInitial = async () => {
      const newArticles = await Request_news_NEWSAPI();
      setNewsList(newArticles.articles);
      setHasMore(newArticles.totalResults-5)
      setNumberPage(2);
      setIsLoad(true)
    };
    fetchInitial();
    
  }, []);

  // console.log(newsList)
  return (
    <div>
      <div className="flex flex-col items-center">
        {newsList.map((news) => (
          <Link
            href={`/news/${news.title}`}
            className="p-2 text-2xl border-2 m-2 w-full max-w-2xl border-cs-bg-border rounded-xl hover:bg-cs-bg-border bg-cs-bg-card"
            key={news.title}
          >
            {news.title}
          </Link>
        ))}
        {hasMore > 0?
        isLoad?<button onClick={loadMore} className="bg-cs-bg-border p-3 rounded-2xl m-2 hover:bg-cs-bg-base">
          Загрузить еще новостей
        </button> :
        <button onClick={loadMore} className="bg-cs-bg-border p-3 rounded-2xl m-2 hover:bg-cs-bg-base" disabled>
          Загрузка...
        </button> 
         :
         <h1 className="bg-cs-bg-border p-3 rounded-2xl m-2 hover:bg-cs-bg-base">Новостей пока больше нет</h1>}
         <ScrollToTopButton />
      </div>
    </div>
  );
}
