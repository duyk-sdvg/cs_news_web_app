import { getTournaments } from "@/api/request_api";
import FantasyPoint from "@/components/pageComponents/fantasyList";
import Loupe from "@/components/pageComponents/searchMatches";
import { Tournament } from "@/types/interface";

export default async function MatchesPage() {
  const tournaments: Record<string, Tournament> = await getTournaments();
  const tournamentsList = Object.values(tournaments);
  // console.log(tournaments);
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-2 ">
          {tournamentsList.map((tournament) => (
            (tournament.tournament_winner !== null)? <FantasyPoint
              key={tournament.tournament_winner.last_match_id} 
              fantasyId={tournament.tournament_winner.last_match_id}//переадю в качесве id - id финальной тгры так как id турниров почемуто не существует
              fantasyName={tournament.tournament_name}
              fantasyWinner={tournament.tournament_winner.name}
            /> : <div>tournament_winner - оказался null</div>
            
          ))}
        </div>
      </div>
    </div>
  );
}
