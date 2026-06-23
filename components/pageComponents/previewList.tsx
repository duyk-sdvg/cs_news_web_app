import { Fantasy, News, NewsResponse } from "@/types/interface";
import Link from "next/link";

export default function FantasyPreviewList({
  fantasyList,
}: {
  fantasyList: Fantasy[];
}) {
  return (
    <div className="w-100 max-h-full border-2 rounded-xl  m-15">
      <h1 className="p-2 bg-cs-bg-base rounded-t-xl">Прошедшие турниры:</h1>
      <div className="bg-white w-99 h-1"/>
      {fantasyList.map((fantasy) => (
        <h1 className="p-1 bg-cs-bg-deep" key={fantasy.id}>{fantasy.name}</h1>
      ))}
       <div className="bg-white w-99 h-1"/>
       <Link href="/matches" className="p-2 px-35 bg-cs-bg-card rounded-b-xl hover:bg-cs-bg-border">Узнать больше</Link>
    </div>
  );
}

export function NewsPreviewList(
    {newsList} : {newsList :  News[]}
){
    return (
    <div className="w-100 max-h-full border-2 rounded-xl  m-15">
      <h1 className="p-2 bg-cs-bg-base rounded-t-xl">Последние новости:</h1>
      <div className="bg-white w-99 h-1"/>
      {newsList.map((news) => (
        <h1 className="p-1 bg-cs-bg-deep" key={news.description}>{news.title}</h1>
      ))}
       <div className="bg-white w-99 h-1"/>
       <h1 className="p-2 px-35 bg-cs-bg-card rounded-b-xl hover:bg-cs-bg-border">Узнать больше</h1>
    </div>
  );
}