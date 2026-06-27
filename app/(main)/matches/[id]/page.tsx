import { getTournaments } from "@/api/request_api";
import { Matches, Tournament } from "@/types/interface";

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const tournaments: Record<string, Tournament> = await getTournaments();
  const currentTournaments = tournaments[id];

  const matchTournament: Matches[] = currentTournaments.matches;

  console.log(currentTournaments);
  console.log(matchTournament);
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl mb-2">{currentTournaments.tournament_name}</h1>
      <div>
        {/* <h1>Матчи:</h1> */}
        {matchTournament.map((match) =>
          currentTournaments.tournament_winner !== null ? (
            <div
              key={match.id}
              className={`p-2 m-2 min-w-200 ${match.id === currentTournaments.tournament_winner?.last_match_id ? "border-4 border-cs-danger" : "border-3 border-cs-bg-border"}`}
            >
              <h1>Дата матча: {match.date}</h1>
              <div>
                <h1 className="flex m-2 justify-center items-end">
                  <div className="text-3xl  mr-8">{match.team1.name}</div>{" "}
                  <div className="flex text-5xl">
                    <div  className={``}>{match.team1.score}</div> : <div className={``}>{match.team2.score}</div>
                  </div>{" "}
                  <div className="text-3xl ml-8">{match.team2.name}</div>
                </h1>
              </div>
              <div>
                {/* <h1>Карты:</h1> */}
                <div className="flex ">
                  {match.maps.map((map) => (
                    <div key={map.name} className="m-2">
                      {map.name} {map.team1_score}:{map.team2_score}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>tournament_winner - null</div>
          ),
        )}
      </div>
    </div>
  );
}
