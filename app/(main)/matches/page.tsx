import { Request_fantasy_CSAPI } from "@/api/request_api";
import FantasyPoint from "@/components/pageComponents/fantasyList";
import { Fantasy } from "@/types/interface";

export default async function MatchesPage() {
  const fantasyList: Fantasy[] = await Request_fantasy_CSAPI();
  return (
    <div className="pt-4 h-150 w-full grid grid-rows-5 grid-flow-col gap-3 justify-items-center ">
        {fantasyList.map((fantasy)=>(<FantasyPoint key={fantasy.id} fantasyName={fantasy.name}/>))}

    </div>
  );
}
