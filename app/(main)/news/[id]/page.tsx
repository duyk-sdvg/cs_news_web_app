import { Request_news_NEWSAPI } from "@/api/request_api";
import { News } from "@/types/interface";

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
    <div>
      {qurrentNews !== undefined ? (
        <div>
          <div>Новость с id: {id}</div>
          <div>{qurrentNews.content}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
