"use client";
import { Request_news_NEWSAPI } from "@/api/request_api";
import { useNews } from "@/context/NewsContext";
import { News } from "@/types/interface";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DetailsNewsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  // const { id } = await params;
  // const newsList: News[] = await Request_news_NEWSAPI();
  const { newsList } = useNews();
  const currentNews = newsList.find(
    (news) => news.title === decodeURIComponent(id),
  );
  console.log(newsList);
  console.log(currentNews);
  return (
    <div className="flex flex-col  items-center pt-5">
      {currentNews !== undefined ? (
        <div className="flex flex-col max-w-200">
          <div className="text-5xl pb-5">{decodeURIComponent(id)}</div>
          <div className="relative w-full h-108">
            <Image
              src={currentNews.urlToImage}
              alt="Фото новости"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-3xl pt-7">{currentNews.description}</div>
        </div>
      ) : (
        <div>qurrentNews - оказался undefined</div>
      )}
    </div>
  );
}
