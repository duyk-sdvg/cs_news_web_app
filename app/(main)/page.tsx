import FantasyPreviewList, { NewsPreviewList } from "@/components/pageComponents/previewList";
import { Request_fantasy_CSAPI, Request_news_NEWSAPI } from "@/api/request_api";
import { Fantasy, News, NewsResponse } from "@/types/interface";

export default async function Home() {
  const fantasyList: Fantasy[] = await Request_fantasy_CSAPI();
  const newsList:  News[] = await Request_news_NEWSAPI();
  
  return (
    <div className="flex items-start justify-center">
      <FantasyPreviewList fantasyList={fantasyList.slice(-3)} />
      <NewsPreviewList newsList={newsList.slice(-3)}/>
    </div>
  );
}
