import { Request_news_NEWSAPI } from "@/api/request_api";
import { News } from "@/types/interface";
import Image from "next/image";

export default async function DetailsNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const newsList: News[] = await Request_news_NEWSAPI();
  const qurrentNews = newsList.find(
    (news) => news.title === decodeURIComponent(id),
  );
  console.log(qurrentNews);
  return (
    <div className="flex flex-col  items-center pt-5">
      {qurrentNews !== undefined ? (
        <div className="flex flex-col max-w-200">
          <div className="text-5xl pb-5">{decodeURIComponent(id)}</div>
          <div className="relative w-full h-108">
            <Image
              src={qurrentNews.urlToImage}
              alt="Фото новости"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-3xl pt-7">{qurrentNews.description}</div>
        </div>
      ) : (
        <div>qurrentNews - оказался undefined</div>
      )}
    </div>
  );
}
