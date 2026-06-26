import FantasyPreviewList, {
  NewsPreviewList,
} from "@/components/pageComponents/previewList";
import {
  getTournaments,
  Request_fantasy_CSAPI,
  Request_news_NEWSAPI,
} from "@/api/request_api";
import { Fantasy, News, NewsResponse, Tournament } from "@/types/interface";

export default async function Home() {
  // const fantasyList: Fantasy[] = await Request_fantasy_CSAPI();
  const tournaments: Record<string, Tournament> = await getTournaments();
  const tournamentsList = Object.keys(tournaments);
  // const newsList:  News[] = await Request_news_NEWSAPI();

  return (
    <div className="flex items-start justify-center">
      <FantasyPreviewList tournamentsList={tournamentsList.slice(-3)} />
      {/* <NewsPreviewList newsList={newsList.slice(-3)}/> */}
    </div>
  );
}
