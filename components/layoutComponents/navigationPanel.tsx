import { getTournaments } from "@/api/request_api";
import { Tournament } from "@/types/interface";
import Link from "next/link";
import Loupe from "../pageComponents/searchMatches";

export default async function NavigatePannel() {
    const tournaments: Record<string, Tournament> = await getTournaments();
    const tournamentsList = Object.values(tournaments);
  return (
    <div className="flex h-15 w-full bg-cs-bg-base justify-center fixed">
      <Link href="/" className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Главная</Link>
      <h1 className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Новости </h1>
      <Link href="/matches" className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Турниры</Link>
      <h1 className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">О нас</h1>
      <Loupe tournaments={tournamentsList}/>
    </div>
  );
}
