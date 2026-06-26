import { getTournaments } from "@/api/request_api";
import { Tournament } from "@/types/interface";

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const tournaments: Record<string, Tournament> = await getTournaments();
  
  const currentTournaments = tournaments[id]
  console.log(currentTournaments)
  return <div>Матч {id}</div>;
}
