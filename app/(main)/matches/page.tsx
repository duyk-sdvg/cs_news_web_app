// import { Request_fantasy_CSAPI } from "@/api/request_api";

// import { Fantasy } from "@/types/interface";

// export default async function MatchesPage() {
//   const fantasyList: Fantasy[] = await Request_fantasy_CSAPI();
//   return (
//     <div className="min-h-screen flex flex-col justify-center">
//     <div className="max-w-5xl mx-auto  px-6 grid w-400 grid-cols-3 gap-6 ">
//         {fantasyList.map((fantasy)=>(<FantasyPoint key={fantasy.id} fantasyId={fantasy.id}  fantasyName={fantasy.name}/>))}

//     </div>
//     </div>
//   );
// }

import { getTournaments } from "@/api/request_api";
import FantasyPoint from "@/components/pageComponents/fantasyList";
import { Tournament } from "@/types/interface";

export default async function MatchesPage() {
  const tournaments: Record<string, Tournament> = await getTournaments();
  const tournamentsList = Object.values(tournaments);
  // console.log(tournamentsList);
  return (
    <div>
      {/* {list.map((t) => (
        <div key={t.tournament_name}>
          <h2>{t.tournament_name}</h2>
          
          <p>Победитель: {t.tournament_winner?.name ?? 'неизвестен'}</p>
          <p>Матчей: {t.matches.length}</p>
        </div>
      ))} */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto  px-6 grid w-400 grid-cols-3 gap-6 ">
          {tournamentsList.map((tournament) => (
            (tournament.tournament_winner !== null)? <FantasyPoint
              key={tournament.tournament_winner.last_match_id}
              fantasyId={tournament.tournament_winner.last_match_id}//переадю в качесве id - id финальной тгры так как id турниров почемуто не существует
              fantasyName={tournament.tournament_name}
            /> : <div>tournament_winner - оказался null</div>
            
          ))}
        </div>
      </div>
    </div>
  );
}
