import { Request_news_NEWSAPI } from "@/api/request_api";
import { News } from "@/types/interface";

export default async function NewsPage(){
    const newsList:  News[] = await Request_news_NEWSAPI();
    console.log(newsList)
    return(
        <div className="">
        {newsList.map((news)=> (
            <h1 className="p-2" key={news.id}>{news.title}</h1>
        ))}
        </div>
    );
}   