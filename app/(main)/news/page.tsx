import { Request_news_NEWSAPI } from "@/api/request_api";
import { News } from "@/types/interface";
import Link from "next/link";

export default async function NewsPage(){
    const newsList:  News[] = await Request_news_NEWSAPI();
    // console.log(newsList)
    return(
        <div className="flex flex-col items-center">
        {newsList.map((news)=> (
            <Link href={`/news/${news.title}`} className="p-2 border-2 m-2 w-full max-w-2xl border-cs-bg-border rounded-xl hover:bg-cs-bg-border bg-cs-bg-card" key={news.title}>{news.title}</Link>
        ))}
        </div>
    );
}   