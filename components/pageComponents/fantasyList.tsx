import Link from "next/link";

export default function FantasyPoint({fantasyId, fantasyName} : {fantasyId : number, fantasyName : string}){

    return(
        <Link href={`/matches/${fantasyId}`} className="flex m-2 p-3 min-w-full bg-cs-bg-card justify-center rounded-xl border-cs-bg-border border-3 hover:bg-cs-bg-border">{fantasyName}</Link>
    );

}