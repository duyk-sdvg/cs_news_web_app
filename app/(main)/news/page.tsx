'use client'

import { Request_news_NEWSAPI } from "@/api/request_api";
import { News } from "@/types/interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [numberPage, setNumberPage] = useState(1)
  const hasFetchedInitial = useRef(false);
  // console.log(newsList)

  const loadMore = async() => {
    const newArticles = await Request_news_NEWSAPI(numberPage);
    console.log(newArticles)
    setNewsList(prev => [...prev, ...newArticles]); 
    setNumberPage(prev => prev + 1);
  }

  useEffect(()=>{
    if (hasFetchedInitial.current) return; // защита от повторного вызова
    hasFetchedInitial.current = true;

    const fetchInitial = async () => {
      const newArticles = await Request_news_NEWSAPI();
      setNewsList(newArticles);
      setNumberPage(2);
    };
    fetchInitial();
  },[])


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
      </div>
      <button onClick={loadMore} className="bg-amber-400">
        Загрузить еще новостей
      </button>
    </div>
  );
}
