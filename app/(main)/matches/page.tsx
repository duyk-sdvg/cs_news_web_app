import { Request_fantasy_CSAPI } from "@/api/request_api";
import FantasyPoint from "@/components/pageComponents/fantasyList";
import { Fantasy } from "@/types/interface";

export default async function MatchesPage() {
  const fantasyList: Fantasy[] = await Request_fantasy_CSAPI();
  return (
    <div className="min-h-screen flex flex-col justify-center">
    <div className="max-w-5xl mx-auto  px-6 grid w-400 grid-cols-3 gap-6 ">
        {fantasyList.map((fantasy)=>(<FantasyPoint key={fantasy.id} fantasyId={fantasy.id}  fantasyName={fantasy.name}/>))}

    </div>
    </div>
  );
}
